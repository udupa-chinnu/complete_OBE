const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');
const PDFDocument = require('pdfkit');

// ============================================
// FEEDBACK REPORTS & ANALYTICS ROUTES
// ============================================

// GET all feedback reports
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { form_id, form_type, report_type } = req.query;

    let query = `
      SELECT 
        afr.id,
        afr.form_id,
        aff.title as form_title,
        aff.form_type,
        afr.report_type,
        afr.total_responses,
        afr.completion_rate,
        afr.average_rating,
        u.username as generated_by_name,
        afr.generated_at,
        afr.created_at
      FROM academic_feedback_reports afr
      LEFT JOIN academic_feedback_forms aff ON afr.form_id = aff.id
      LEFT JOIN users u ON afr.generated_by = u.id
      WHERE 1=1
    `;

    const params = [];

    if (form_id) {
      query += ' AND afr.form_id = ?';
      params.push(form_id);
    }

    if (form_type) {
      query += ' AND aff.form_type = ?';
      params.push(form_type);
    }

    if (report_type) {
      query += ' AND afr.report_type = ?';
      params.push(report_type);
    }

    query += ' ORDER BY afr.generated_at DESC LIMIT 100';

    const [reports] = await pool.execute(query, params);

    res.json({
      success: true,
      data: reports,
      message: 'Feedback reports retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching feedback reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback reports',
      error: error.message
    });
  }
});

// GET report summary for a specific form
router.get('/summary/:form_id', authenticateToken, async (req, res) => {
  try {
    const { form_id } = req.params;

    // Get form details
    const [forms] = await pool.execute(`
      SELECT 
        aff.id,
        aff.title,
        aff.form_type,
        aff.status,
        COUNT(DISTINCT afr.id) as total_responses,
        COUNT(DISTINCT afq.id) as total_questions
      FROM academic_feedback_forms aff
      LEFT JOIN academic_feedback_responses afr ON aff.id = afr.form_id AND afr.response_status = 'Submitted'
      LEFT JOIN academic_feedback_questions afq ON aff.id = afq.form_id
      WHERE aff.id = ?
      GROUP BY aff.id
    `, [form_id]);

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    const form = forms[0];

    // Calculate completion rate
    const [targetCounts] = await pool.execute(`
      SELECT COUNT(*) as target_count
      FROM academic_feedback_responses
      WHERE form_id = ?
    `, [form_id]);

    const completionRate = form.total_responses > 0 
      ? ((form.total_responses / targetCounts[0].target_count) * 100).toFixed(2)
      : 0;

    // Get questions and average ratings
    const [questions] = await pool.execute(`
      SELECT 
        afq.id,
        afq.question_text,
        afq.question_type,
        ROUND(AVG(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as average_rating,
        COUNT(ad.id) as response_count
      FROM academic_feedback_questions afq
      LEFT JOIN academic_answer_details ad ON afq.id = ad.question_id
      WHERE afq.form_id = ?
      GROUP BY afq.id
      ORDER BY afq.sort_order
    `, [form_id]);

    const overallAverageRating = questions.length > 0
      ? (questions.reduce((sum, q) => sum + (q.average_rating || 0), 0) / questions.length).toFixed(2)
      : 0;

    res.json({
      success: true,
      data: {
        form,
        completionRate,
        overallAverageRating,
        questions,
        summary: {
          totalResponses: form.total_responses,
          totalQuestions: form.total_questions,
          averageRating: overallAverageRating,
          completionRate
        }
      }
    });
  } catch (error) {
    console.error('Error fetching form summary:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching form summary',
      error: error.message
    });
  }
});

// GET detailed question analytics
router.get('/analytics/:form_id', authenticateToken, async (req, res) => {
  try {
    const { form_id } = req.params;

    // Get all questions with detailed analytics
    const [questions] = await pool.execute(`
      SELECT 
        afq.id,
        afq.question_text,
        afq.question_type,
        afq.area_id,
        afa.area_name,
        COUNT(DISTINCT ad.response_id) as response_count,
        ROUND(AVG(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as average_rating,
        MIN(ad.answer_rating) as min_rating,
        MAX(ad.answer_rating) as max_rating,
        ROUND(STDDEV(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as std_deviation
      FROM academic_feedback_questions afq
      LEFT JOIN academic_feedback_areas afa ON afq.area_id = afa.id
      LEFT JOIN academic_answer_details ad ON afq.id = ad.question_id
      WHERE afq.form_id = ?
      GROUP BY afq.id
      ORDER BY afa.sort_order, afq.sort_order
    `, [form_id]);

    // For each question, get rating distribution if it's a rating type
    for (const question of questions) {
      if (question.question_type === 'rating') {
        const [ratingDistribution] = await pool.execute(`
          SELECT 
            ad.answer_rating as rating,
            COUNT(*) as count
          FROM academic_answer_details ad
          WHERE ad.question_id = ? AND ad.answer_rating IS NOT NULL
          GROUP BY ad.answer_rating
          ORDER BY ad.answer_rating
        `, [question.id]);
        question.ratingDistribution = ratingDistribution;
      } else if (question.question_type === 'multiple_choice') {
        // Get option distribution for multiple choice
        const [optionDistribution] = await pool.execute(`
          SELECT 
            aqo.option_text,
            COUNT(*) as count
          FROM academic_answer_details ad
          JOIN academic_question_options aqo ON ad.answer_option_id = aqo.id
          WHERE ad.question_id = ?
          GROUP BY ad.answer_option_id
          ORDER BY COUNT(*) DESC
        `, [question.id]);
        question.optionDistribution = optionDistribution;
      }
    }

    // Organize by area
    const areas = [...new Map(questions.map(q => [q.area_id, q])).values()].map(q => q.area_id);
    const groupedByArea = {};
    
    questions.forEach(question => {
      if (!groupedByArea[question.area_name]) {
        groupedByArea[question.area_name] = [];
      }
      groupedByArea[question.area_name].push(question);
    });

    res.json({
      success: true,
      data: {
        questions,
        groupedByArea
      }
    });
  } catch (error) {
    console.error('Error fetching question analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching question analytics',
      error: error.message
    });
  }
});

// GET responses for a specific form
router.get('/responses/:form_id', authenticateToken, async (req, res) => {
  try {
    const { form_id } = req.params;
    const { status, page = 1, limit = 20 } = req.query;

    let query = `
      SELECT 
        afr.id,
        afr.form_id,
        afr.respondent_type,
        afr.response_status,
        u.username as respondent_name,
        u.email as respondent_email,
        f.first_name as faculty_name,
        afr.submitted_time,
        afr.completion_time_minutes
      FROM academic_feedback_responses afr
      LEFT JOIN users u ON afr.respondent_user_id = u.id
      LEFT JOIN faculties f ON afr.faculty_id = f.id
      WHERE afr.form_id = ?
    `;

    const params = [form_id];

    if (status) {
      query += ' AND afr.response_status = ?';
      params.push(status);
    }

    // Pagination
    const offset = (page - 1) * limit;
    query += ` ORDER BY afr.submitted_time DESC LIMIT ? OFFSET ?`;
    params.push(parseInt(limit), offset);

    const [responses] = await pool.execute(query, params);

    // Get total count
    let countQuery = `
      SELECT COUNT(*) as total
      FROM academic_feedback_responses
      WHERE form_id = ?
    `;
    const countParams = [form_id];

    if (status) {
      countQuery += ' AND response_status = ?';
      countParams.push(status);
    }

    const [countResult] = await pool.execute(countQuery, countParams);

    res.json({
      success: true,
      data: {
        responses,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: countResult[0].total,
          pages: Math.ceil(countResult[0].total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching responses',
      error: error.message
    });
  }
});

// GET detailed response for a specific respondent
router.get('/response-details/:response_id', authenticateToken, async (req, res) => {
  try {
    const { response_id } = req.params;

    // Get response header info
    const [responses] = await pool.execute(`
      SELECT 
        afr.id,
        afr.form_id,
        afr.respondent_type,
        afr.response_status,
        u.username as respondent_name,
        u.email,
        f.first_name as faculty_name,
        afr.submitted_time,
        afr.completion_time_minutes,
        afr.created_at
      FROM academic_feedback_responses afr
      LEFT JOIN users u ON afr.respondent_user_id = u.id
      LEFT JOIN faculties f ON afr.faculty_id = f.id
      WHERE afr.id = ?
    `, [response_id]);

    if (responses.length === 0) {
      return res.status(404).json({ success: false, message: 'Response not found' });
    }

    const response = responses[0];

    // Get all answers with question details
    const [answers] = await pool.execute(`
      SELECT 
        ad.id,
        ad.question_id,
        afq.question_text,
        afq.question_type,
        afq.area_id,
        afa.area_name,
        ad.answer_text,
        ad.answer_rating,
        aqo.option_text
      FROM academic_answer_details ad
      LEFT JOIN academic_feedback_questions afq ON ad.question_id = afq.id
      LEFT JOIN academic_feedback_areas afa ON afq.area_id = afa.id
      LEFT JOIN academic_question_options aqo ON ad.answer_option_id = aqo.id
      WHERE ad.response_id = ?
      ORDER BY afa.sort_order, afq.sort_order
    `, [response_id]);

    res.json({
      success: true,
      data: {
        response,
        answers
      }
    });
  } catch (error) {
    console.error('Error fetching response details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching response details',
      error: error.message
    });
  }
});

// GET faculty-specific report
router.get('/faculty/:faculty_id', authenticateToken, async (req, res) => {
  try {
    const { faculty_id } = req.params;
    const { semester_id } = req.query;

    let query = `
      SELECT 
        aff.id,
        aff.title,
        aff.form_type,
        COUNT(DISTINCT afr.id) as total_responses,
        ROUND(AVG(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as average_rating,
        d.name as department_name,
        acs.semester_name
      FROM academic_feedback_forms aff
      LEFT JOIN academic_feedback_responses afr ON aff.id = afr.form_id AND afr.faculty_id = ? AND afr.response_status = 'Submitted'
      LEFT JOIN academic_feedback_questions afq ON aff.id = afq.form_id
      LEFT JOIN academic_answer_details ad ON afq.id = ad.question_id AND ad.response_id IN (
        SELECT id FROM academic_feedback_responses WHERE faculty_id = ? AND response_status = 'Submitted'
      )
      LEFT JOIN academic_faculty_feedback_forms afff ON aff.id = afff.form_id
      LEFT JOIN departments d ON afff.department_id = d.id
      LEFT JOIN academic_semesters acs ON afff.semester_id = acs.id
      WHERE aff.form_type = 'faculty_feedback'
    `;

    const params = [faculty_id, faculty_id];

    if (semester_id) {
      query += ' AND afff.semester_id = ?';
      params.push(semester_id);
    }

    query += ' GROUP BY aff.id ORDER BY aff.created_at DESC';

    const [reports] = await pool.execute(query, params);

    res.json({
      success: true,
      data: reports,
      message: 'Faculty feedback reports retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching faculty reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching faculty reports',
      error: error.message
    });
  }
});

// GET department-specific report
router.get('/department/:department_id', authenticateToken, async (req, res) => {
  try {
    const { department_id } = req.params;
    const { form_type, semester_id } = req.query;

    let query = `
      SELECT 
        aff.id,
        aff.title,
        aff.form_type,
        aff.status,
        COUNT(DISTINCT afr.id) as total_responses,
        COUNT(DISTINCT afq.id) as total_questions,
        ROUND(AVG(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as average_rating,
        acs.semester_name,
        aff.created_at
      FROM academic_feedback_forms aff
      LEFT JOIN academic_feedback_responses afr ON aff.id = afr.form_id AND afr.response_status = 'Submitted'
      LEFT JOIN academic_feedback_questions afq ON aff.id = afq.form_id
      LEFT JOIN academic_answer_details ad ON afq.id = ad.question_id
      LEFT JOIN academic_faculty_feedback_forms afff ON aff.id = afff.form_id AND aff.form_type = 'faculty_feedback'
      LEFT JOIN academic_institution_feedback_forms aiff ON aff.id = aiff.form_id AND aff.form_type = 'institution_feedback'
      LEFT JOIN academic_semesters acs ON COALESCE(afff.semester_id, aiff.semester_id) = acs.id
      WHERE (afff.department_id = ? OR aiff.semester_id IN (SELECT DISTINCT semester_id FROM academic_semesters))
    `;

    const params = [department_id];

    if (form_type) {
      query += ' AND aff.form_type = ?';
      params.push(form_type);
    }

    if (semester_id) {
      query += ' AND COALESCE(afff.semester_id, aiff.semester_id) = ?';
      params.push(semester_id);
    }

    query += ' GROUP BY aff.id ORDER BY aff.created_at DESC';

    const [reports] = await pool.execute(query, params);

    res.json({
      success: true,
      data: reports,
      message: 'Department feedback reports retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching department reports:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching department reports',
      error: error.message
    });
  }
});

// Generate new report for a form
router.post('/generate/:form_id', authenticateToken, requireRole('admin', 'academic'), async (req, res) => {
  try {
    const { form_id } = req.params;
    const { report_type } = req.body;

    if (!['summary', 'detailed', 'comparative'].includes(report_type)) {
      return res.status(400).json({ success: false, message: 'Invalid report type' });
    }

    // Get form data
    const [forms] = await pool.execute(
      'SELECT * FROM academic_feedback_forms WHERE id = ?',
      [form_id]
    );

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    // Calculate statistics
    const [stats] = await pool.execute(`
      SELECT 
        COUNT(DISTINCT afr.id) as total_responses,
        ROUND(AVG(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as average_rating
      FROM academic_feedback_responses afr
      LEFT JOIN academic_answer_details ad ON afr.id = ad.response_id
      WHERE afr.form_id = ? AND afr.response_status = 'Submitted'
    `, [form_id]);

    const [questionStats] = await pool.execute(`
      SELECT 
        afq.id,
        afq.question_text,
        ROUND(AVG(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as average_rating,
        COUNT(ad.id) as response_count
      FROM academic_feedback_questions afq
      LEFT JOIN academic_answer_details ad ON afq.id = ad.question_id
      WHERE afq.form_id = ?
      GROUP BY afq.id
    `, [form_id]);

    const totalResponses = stats[0]?.total_responses || 0;
    const overallAverage = stats[0]?.average_rating || 0;
    const completionRate = totalResponses > 0 ? ((totalResponses / 100) * 100).toFixed(2) : 0; // Simplified

    // Insert report
    const [result] = await pool.execute(`
      INSERT INTO academic_feedback_reports (
        form_id, report_type, total_responses, completion_rate, 
        average_rating, generated_by, generated_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [form_id, report_type, totalResponses, completionRate, overallAverage, req.user.id]);

    res.status(201).json({
      success: true,
      message: 'Report generated successfully',
      data: {
        id: result.insertId,
        form_id,
        report_type,
        total_responses: totalResponses,
        completion_rate: completionRate,
        average_rating: overallAverage,
        generated_at: new Date()
      }
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating report',
      error: error.message
    });
  }
});

// EXPORT report as PDF for a form (public - no auth required)
router.get('/export/:form_id/pdf', async (req, res) => {
  try {
    const { form_id } = req.params;

    // Fetch form
    const [forms] = await pool.execute('SELECT id, title, form_type FROM academic_feedback_forms WHERE id = ?', [form_id]);
    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    const form = forms[0];

    // Fetch responses and answers
    const [responses] = await pool.execute(`
      SELECT afr.id as response_id, afr.submitted_time, afr.respondent_type, u.username as respondent_name, u.email, f.first_name as faculty_name
      FROM academic_feedback_responses afr
      LEFT JOIN users u ON afr.respondent_user_id = u.id
      LEFT JOIN faculties f ON afr.faculty_id = f.id
      WHERE afr.form_id = ? AND afr.response_status = 'Submitted'
      ORDER BY afr.submitted_time DESC
    `, [form_id]);

    // Start PDF document
    const doc = new PDFDocument({ margin: 40, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${form.title.replace(/\s+/g, '_')}_report.pdf"`);
    doc.pipe(res);

    doc.fontSize(16).text(form.title, { align: 'center' });
    doc.moveDown();

    for (const r of responses) {
      doc.fontSize(12).text(`Response ID: ${r.response_id}   Submitted: ${r.submitted_time}`);
      doc.fontSize(10).text(`Respondent: ${r.respondent_name || 'N/A'} (${r.email || 'N/A'})   Type: ${r.respondent_type || 'N/A'}   Faculty: ${r.faculty_name || 'N/A'}`);
      doc.moveDown(0.2);

      // Fetch answers for this response

      // Fetch questions for the form and left join answers for this response so text answers
      // (and unanswered questions) are also included in the PDF output.
      const [answers] = await pool.execute(`
        SELECT afq.question_text, afq.question_type, ad.answer_text, ad.answer_rating, aqo.option_text
        FROM academic_feedback_questions afq
        LEFT JOIN academic_answer_details ad ON afq.id = ad.question_id AND ad.response_id = ?
        LEFT JOIN academic_question_options aqo ON ad.answer_option_id = aqo.id
        WHERE afq.form_id = ?
        ORDER BY afq.sort_order
      `, [r.response_id, form_id]);

      for (const a of answers) {
        let answerText = '';
        if (a.question_type === 'rating') answerText = a.answer_rating !== null ? String(a.answer_rating) : 'N/A';
        else if (a.question_type === 'multiple_choice') answerText = a.option_text || a.answer_text || 'N/A';
        else answerText = a.answer_text || 'N/A';

        doc.fontSize(10).text(`- ${a.question_text}`);
        doc.fontSize(10).text(`  Answer: ${answerText}`);
        doc.moveDown(0.1);
      }

      doc.moveDown(0.6);
      doc.moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).strokeOpacity(0.1).stroke();
      doc.moveDown();
    }

    // Audit log: download_report (recorded as system user when unauthenticated)
    await pool.execute(`
      INSERT INTO academic_feedback_audit_log (form_id, action, action_by, action_details, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `, [form_id, 'download_report', req.user?.id || 1, `Exported PDF report for form ${form_id}`, req.ip || null]);

    doc.end();
  } catch (error) {
    console.error('Error exporting PDF report:', error);
    res.status(500).json({ success: false, message: 'Error exporting PDF', error: error.message });
  }
});

module.exports = router;

