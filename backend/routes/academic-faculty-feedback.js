const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');

// ============================================
// FACULTY FEEDBACK MANAGEMENT ROUTES
// ============================================

// GET all faculty feedback forms
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { includeInactive } = req.query;
    
    let query = `
      SELECT 
        aff.id,
        aff.title,
        aff.description,
        aff.status,
        d.name as department_name,
        d.id as department_id,
        acs.semester_name,
        acs.id as semester_id,
        COUNT(DISTINCT afr.id) as total_responses,
        COUNT(DISTINCT afq.id) as total_questions,
        u.username as created_by_name,
        aff.created_at,
        aff.updated_at
      FROM academic_feedback_forms aff
      LEFT JOIN academic_faculty_feedback_forms afff ON aff.id = afff.form_id
      LEFT JOIN departments d ON afff.department_id = d.id
      LEFT JOIN academic_semesters acs ON afff.semester_id = acs.id
      LEFT JOIN academic_feedback_responses afr ON aff.id = afr.form_id AND afr.response_status = 'Submitted'
      LEFT JOIN academic_feedback_questions afq ON aff.id = afq.form_id
      LEFT JOIN users u ON aff.created_by = u.id
      WHERE aff.form_type = 'faculty_feedback'
    `;

    if (includeInactive !== 'true') {
      query += ' AND aff.status IN ("Active", "Inactive")';
    }

    query += ' GROUP BY aff.id ORDER BY aff.created_at DESC';

    const [forms] = await pool.execute(query);

    res.json({ 
      success: true, 
      data: forms,
      message: 'Faculty feedback forms retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching faculty feedback forms:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching faculty feedback forms', 
      error: error.message 
    });
  }
});
// PUBLIC: list all faculty feedback forms (for admin UI without auth)
router.get('/public', async (req, res) => {
  try {
    const { includeInactive } = req.query;
    let query = `
      SELECT 
        aff.id,
        aff.title,
        aff.description,
        aff.status,
        d.name as department_name,
        d.id as department_id,
        acs.semester_name,
        acs.id as semester_id,
        COUNT(DISTINCT afr.id) as total_responses,
        COUNT(DISTINCT afq.id) as total_questions,
        u.username as created_by_name,
        aff.created_at,
        aff.updated_at
      FROM academic_feedback_forms aff
      LEFT JOIN academic_faculty_feedback_forms afff ON aff.id = afff.form_id
      LEFT JOIN departments d ON afff.department_id = d.id
      LEFT JOIN academic_semesters acs ON afff.semester_id = acs.id
      LEFT JOIN academic_feedback_responses afr ON aff.id = afr.form_id AND afr.response_status = 'Submitted'
      LEFT JOIN academic_feedback_questions afq ON aff.id = afq.form_id
      LEFT JOIN users u ON aff.created_by = u.id
      WHERE aff.form_type = 'faculty_feedback'
    `;

    if (includeInactive !== 'true') {
      query += ' AND aff.status IN ("Active", "Inactive")';
    }

    query += ' GROUP BY aff.id ORDER BY aff.created_at DESC';

    const [forms] = await pool.execute(query);

    res.json({ success: true, data: forms });
  } catch (error) {
    console.error('Error fetching public faculty feedback forms:', error);
    res.status(500).json({ success: false, message: 'Error fetching forms', error: error.message });
  }
});

// PUBLIC: create faculty feedback form (admin UI without auth)
router.post('/public', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const {
      title,
      description,
      department_id,
      semester_id,
      target_faculty_ids,
      response_deadline,
      areas,
      questions,
      is_mandatory
    } = req.body;

    if (!title || !department_id || !semester_id) {
      return res.status(400).json({ success: false, message: 'Title, department_id, and semester_id are required' });
    }

    await connection.beginTransaction();

    const [formResult] = await connection.execute(`
      INSERT INTO academic_feedback_forms (
        form_type, title, description, department_id, semester_id, 
        status, created_by, is_mandatory
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, ['faculty_feedback', title, description, department_id, semester_id, 'Active', req.body.created_by || 1, is_mandatory || false]);

    const formId = formResult.insertId;

  console.log('DEBUG: Faculty form POST - formId:', formId, 'areas:', areas, 'questions:', questions);

    await connection.execute(`
      INSERT INTO academic_faculty_feedback_forms (
        form_id, department_id, semester_id, target_faculty_ids, response_deadline
      ) VALUES (?, ?, ?, ?, ?)
    `, [formId, department_id || null, semester_id || null, target_faculty_ids ? JSON.stringify(target_faculty_ids) : null, response_deadline || null]);

    if (areas && Array.isArray(areas) && areas.length > 0) {
      for (const [index, area] of areas.entries()) {
        const [areaResult] = await connection.execute(`
          INSERT INTO academic_feedback_areas (
            form_id, area_name, area_description, sort_order, is_mandatory
          ) VALUES (?, ?, ?, ?, ?)
        `, [formId, area.name, area.description || null, index, area.isMandatory !== false]);

        if (area.questions && Array.isArray(area.questions)) {
          for (const [qIndex, question] of area.questions.entries()) {
            const [qResult] = await connection.execute(`
              INSERT INTO academic_feedback_questions (
                form_id, area_id, question_text, question_type, is_mandatory,
                scale_min, scale_max, scale_min_label, scale_max_label, sort_order
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
              formId,
              areaResult.insertId,
              question.text,
              question.type || 'rating',
              question.is_mandatory !== false,
              question.scale_min || 1,
              question.scale_max || 5,
              question.scale_min_label,
              question.scale_max_label,
              qIndex
            ]);

            if (question.type === 'multiple_choice' && question.options) {
              for (const [oIndex, option] of question.options.entries()) {
                await connection.execute(`
                  INSERT INTO academic_question_options (question_id, option_text, sort_order) VALUES (?, ?, ?)
                `, [qResult.insertId, option, oIndex]);
              }
            }
          }
        }
      }
    } else if (questions && Array.isArray(questions)) {
      // Handle flat questions array (when no areas provided or empty areas)
      console.log('DEBUG: Faculty POST - inserting flat questions count=', questions.length);
      for (const [index, question] of questions.entries()) {
        try {
          console.log('DEBUG: Faculty POST - inserting question index=', index, 'text=', question && question.text);
          const [qResult] = await connection.execute(`
            INSERT INTO academic_feedback_questions (
              form_id, question_text, question_type, is_mandatory,
              scale_min, scale_max, scale_min_label, scale_max_label, sort_order
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            formId,
            question.text,
            question.type || 'rating',
            question.is_mandatory !== false,
            question.scale_min || 1,
            question.scale_max || 5,
            question.scale_min_label || null,
            question.scale_max_label || null,
            index
          ]);

          console.log('DEBUG: Faculty POST - inserted question id=', qResult.insertId);

          if (question.type === 'multiple_choice' && question.options) {
            for (const [oIndex, option] of question.options.entries()) {
              await connection.execute(`
                INSERT INTO academic_question_options (
                  question_id, option_text, sort_order
                ) VALUES (?, ?, ?)
              `, [qResult.insertId, option, oIndex]);
              console.log('DEBUG: Faculty POST - inserted option for question=', qResult.insertId, 'option=', option);
            }
          }
        } catch (qerr) {
          console.error('ERROR: Faculty POST - failed inserting question at index', index, qerr);
        }
      }
    }

    await connection.execute(`
      INSERT INTO academic_feedback_audit_log (form_id, action, action_by, ip_address) VALUES (?, ?, ?, ?)
    `, [formId, 'create', req.body.created_by || 1, req.ip]);

    await connection.commit();
    res.status(201).json({ success: true, message: 'Form created', data: { id: formId } });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating public faculty form:', error);
    res.status(500).json({ success: false, message: 'Error creating form', error: error.message });
  } finally {
    connection.release();
  }
});

// PUBLIC: update faculty feedback form (admin UI without auth)
router.put('/public/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const {
      title,
      description,
      department_id,
      semester_id,
      status,
      target_faculty_ids,
      response_deadline,
      areas,
      questions
    } = req.body;

    const [forms] = await connection.execute('SELECT * FROM academic_feedback_forms WHERE id = ? AND form_type = ?', [id, 'faculty_feedback']);
    if (forms.length === 0) return res.status(404).json({ success: false, message: 'Form not found' });

    await connection.beginTransaction();

    const updateFields = [];
    const updateValues = [];
    if (title) { updateFields.push('title = ?'); updateValues.push(title); }
    if (description !== undefined) { updateFields.push('description = ?'); updateValues.push(description); }
    if (status) { updateFields.push('status = ?'); updateValues.push(status); }

    if (updateFields.length > 0) {
      updateFields.push('updated_at = NOW()');
      updateValues.push(id);
      await connection.execute(`UPDATE academic_feedback_forms SET ${updateFields.join(', ')} WHERE id = ?`, updateValues);
    }

    if (department_id !== undefined || semester_id !== undefined || target_faculty_ids !== undefined || response_deadline !== undefined) {
      const updateFacultyFields = [];
      const updateFacultyValues = [];
      if (department_id !== undefined) { updateFacultyFields.push('department_id = ?'); updateFacultyValues.push(department_id || null); }
      if (semester_id !== undefined) { updateFacultyFields.push('semester_id = ?'); updateFacultyValues.push(semester_id || null); }
      if (target_faculty_ids !== undefined) { updateFacultyFields.push('target_faculty_ids = ?'); updateFacultyValues.push(target_faculty_ids ? JSON.stringify(target_faculty_ids) : null); }
      if (response_deadline !== undefined) { updateFacultyFields.push('response_deadline = ?'); updateFacultyValues.push(response_deadline || null); }

      if (updateFacultyFields.length > 0) {
        updateFacultyFields.push('updated_at = NOW()');
        updateFacultyValues.push(id);
        await connection.execute(`UPDATE academic_faculty_feedback_forms SET ${updateFacultyFields.join(', ')} WHERE form_id = ?`, updateFacultyValues);
      }
    }

    if (areas && Array.isArray(areas) && areas.length > 0) {
      await connection.execute('DELETE FROM academic_feedback_areas WHERE form_id = ?', [id]);
      await connection.execute('DELETE FROM academic_feedback_questions WHERE form_id = ? AND area_id IS NOT NULL', [id]);
      for (const [index, area] of areas.entries()) {
        const [areaResult] = await connection.execute(`INSERT INTO academic_feedback_areas (form_id, area_name, area_description, sort_order, is_mandatory) VALUES (?, ?, ?, ?, ?)`, [id, area.name, area.description || null, index, area.isMandatory !== false]);
        if (area.questions && Array.isArray(area.questions)) {
          for (const [qIndex, question] of area.questions.entries()) {
            const [qResult] = await connection.execute(`INSERT INTO academic_feedback_questions (form_id, area_id, question_text, question_type, is_mandatory, scale_min, scale_max, scale_min_label, scale_max_label, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [id, areaResult.insertId, question.text, question.type || 'rating', question.is_mandatory !== false, question.scale_min || 1, question.scale_max || 5, question.scale_min_label || null, question.scale_max_label || null, qIndex]);
            if (question.type === 'multiple_choice' && question.options) {
              for (const [oIndex, option] of question.options.entries()) {
                await connection.execute('INSERT INTO academic_question_options (question_id, option_text, sort_order) VALUES (?, ?, ?)', [qResult.insertId, option, oIndex]);
              }
            }
          }
        }
      }
    } else if (questions && Array.isArray(questions)) {
      // Handle flat questions array (when no areas provided or empty areas)
      await connection.execute('DELETE FROM academic_feedback_questions WHERE form_id = ?', [id]);
      for (const [index, question] of questions.entries()) {
        const [qResult] = await connection.execute(`
          INSERT INTO academic_feedback_questions (
            form_id, question_text, question_type, is_mandatory,
            scale_min, scale_max, scale_min_label, scale_max_label, sort_order
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          id,
          question.text,
          question.type || 'rating',
          question.is_mandatory !== false,
          question.scale_min || 1,
          question.scale_max || 5,
          question.scale_min_label || null,
          question.scale_max_label || null,
          index
        ]);

        if (question.type === 'multiple_choice' && question.options) {
          for (const [oIndex, option] of question.options.entries()) {
            await connection.execute(`
              INSERT INTO academic_question_options (
                question_id, option_text, sort_order
              ) VALUES (?, ?, ?)
            `, [qResult.insertId, option, oIndex]);
          }
        }
      }
    }

    await connection.execute('INSERT INTO academic_feedback_audit_log (form_id, action, action_by, ip_address) VALUES (?, ?, ?, ?)', [id, 'update', req.body.updated_by || 1, req.ip]);
    await connection.commit();
    res.json({ success: true, message: 'Form updated', data: { id } });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating public faculty form:', error);
    res.status(500).json({ success: false, message: 'Error updating form', error: error.message });
  } finally {
    connection.release();
  }
});

// PUBLIC: toggle status
router.patch('/public/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Active','Inactive','Draft'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });
    if (status === 'Active') {
      await pool.execute(`UPDATE academic_feedback_forms SET status = 'Inactive' WHERE form_type = 'faculty_feedback' AND id != ? AND status = 'Active'`, [id]);
    }
    const [result] = await pool.execute(`UPDATE academic_feedback_forms SET status = ?, updated_at = NOW() WHERE id = ? AND form_type = 'faculty_feedback'`, [status, id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Form not found' });
    await pool.execute('INSERT INTO academic_feedback_audit_log (form_id, action, action_by, action_details, ip_address) VALUES (?, ?, ?, ?, ?)', [id, 'update_status', req.body.updated_by || 1, `Status changed to ${status}`, req.ip]);
    res.json({ success: true, message: `Form status updated to ${status}` });
  } catch (error) {
    console.error('Error toggling public status:', error);
    res.status(500).json({ success: false, message: 'Error toggling status', error: error.message });
  }
});

// PUBLIC: delete form
router.delete('/public/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const [forms] = await connection.execute('SELECT * FROM academic_feedback_forms WHERE id = ? AND form_type = ?', [id, 'faculty_feedback']);
    if (forms.length === 0) return res.status(404).json({ success: false, message: 'Form not found' });
    await connection.beginTransaction();
    await connection.execute('DELETE FROM academic_feedback_forms WHERE id = ?', [id]);
    await connection.execute('INSERT INTO academic_feedback_audit_log (form_id, action, action_by, ip_address) VALUES (?, ?, ?, ?)', [id, 'delete', req.body.deleted_by || 1, req.ip]);
    await connection.commit();
    res.json({ success: true, message: 'Form deleted' });
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting public faculty form:', error);
    res.status(500).json({ success: false, message: 'Error deleting form', error: error.message });
  } finally {
    connection.release();
  }
});

// GET single faculty feedback form with all details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Get form details
    const [forms] = await pool.execute(`
      SELECT 
        aff.*,
        afff.department_id,
        afff.semester_id,
        afff.target_faculty_ids,
        d.name as department_name,
        acs.semester_name
      FROM academic_feedback_forms aff
      LEFT JOIN academic_faculty_feedback_forms afff ON aff.id = afff.form_id
      LEFT JOIN departments d ON afff.department_id = d.id
      LEFT JOIN academic_semesters acs ON afff.semester_id = acs.id
      WHERE aff.id = ? AND aff.form_type = 'faculty_feedback'
    `, [id]);

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Faculty feedback form not found' });
    }

    const form = forms[0];

    // Get areas with questions
    const [areas] = await pool.execute(`
      SELECT 
        afa.id,
        afa.area_name,
        afa.area_description,
        afa.is_mandatory,
        afa.sort_order
      FROM academic_feedback_areas afa
      WHERE afa.form_id = ?
      ORDER BY afa.sort_order
    `, [id]);

    // Get all questions for this form
    const [questions] = await pool.execute(`
      SELECT 
        afq.id,
        afq.area_id,
        afq.question_text,
        afq.question_type,
        afq.is_mandatory,
        afq.scale_min,
        afq.scale_max,
        afq.scale_min_label,
        afq.scale_max_label,
        afq.sort_order
      FROM academic_feedback_questions afq
      WHERE afq.form_id = ?
      ORDER BY afq.area_id, afq.sort_order
    `, [id]);

    // Get options for multiple choice questions
    for (let question of questions) {
      if (question.question_type === 'multiple_choice') {
        const [options] = await pool.execute(`
          SELECT 
            id,
            option_text,
            sort_order
          FROM academic_question_options
          WHERE question_id = ?
          ORDER BY sort_order
        `, [question.id]);
        question.options = options;
      }
    }

    // Organize questions by area
    const areasWithQuestions = areas.map(area => ({
      ...area,
      questions: questions.filter(q => q.area_id === area.id)
    }));

    res.json({
      success: true,
      data: {
        ...form,
        areas: areasWithQuestions,
        allQuestions: questions
      }
    });
  } catch (error) {
    console.error('Error fetching faculty feedback form:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching faculty feedback form', 
      error: error.message 
    });
  }
});

// SUBMIT responses for a faculty feedback form (no auth required for now)
router.post('/:id/submit', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const { respondent_user_id, respondent_type = 'student', faculty_id, answers } = req.body;

    // Basic validation
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, message: 'Answers are required' });
    }

    // Check form exists and is active
    const [forms] = await pool.execute(
      'SELECT id, status FROM academic_feedback_forms WHERE id = ? AND form_type = ?',
      [id, 'faculty_feedback']
    );

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    await connection.beginTransaction();

    const [respResult] = await connection.execute(`
      INSERT INTO academic_feedback_responses (
        form_id, respondent_user_id, respondent_type, faculty_id, response_status, ip_address, user_agent, start_time, submitted_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      id,
      respondent_user_id || 1,
      respondent_type,
      faculty_id || null,
      'Submitted',
      req.ip,
      req.headers['user-agent'] || null
    ]);

    const responseId = respResult.insertId;

    // Insert each answer
    for (const ans of answers) {
      const { question_id, answer_text, answer_rating, answer_option_id } = ans;
      await connection.execute(`
        INSERT INTO academic_answer_details (
          response_id, question_id, answer_text, answer_rating, answer_option_id, answer_timestamp
        ) VALUES (?, ?, ?, ?, ?, NOW())
      `, [responseId, question_id, answer_text || null, answer_rating || null, answer_option_id || null]);
    }

    // Insert audit log (use respondent_user_id when available or fallback to 1)
    await connection.execute(`
      INSERT INTO academic_feedback_audit_log (form_id, action, action_by, action_details, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `, [id, 'submit', respondent_user_id || 1, `Submitted response id ${responseId}`, req.ip]);

    await connection.commit();

    res.status(201).json({ success: true, message: 'Feedback submitted successfully', data: { responseId } });
  } catch (error) {
    await connection.rollback();
    console.error('Error submitting faculty feedback response:', error);
    res.status(500).json({ success: false, message: 'Error submitting feedback', error: error.message });
  } finally {
    connection.release();
  }
});

// PUBLIC: Get single faculty feedback form with details (no auth) - used by student portal
router.get('/public/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [forms] = await pool.execute(`
      SELECT 
        aff.*,
        afff.department_id,
        afff.semester_id,
        afff.target_faculty_ids,
        d.name as department_name,
        acs.semester_name
      FROM academic_feedback_forms aff
      LEFT JOIN academic_faculty_feedback_forms afff ON aff.id = afff.form_id
      LEFT JOIN departments d ON afff.department_id = d.id
      LEFT JOIN academic_semesters acs ON afff.semester_id = acs.id
      WHERE aff.id = ? AND aff.form_type = 'faculty_feedback'
    `, [id]);

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Faculty feedback form not found' });
    }

    const form = forms[0];

    console.log('DEBUG: Faculty GET /public/:id - formId:', id, 'title:', form.title);

    const [areas] = await pool.execute(`
      SELECT 
        afa.id,
        afa.area_name,
        afa.area_description,
        afa.is_mandatory,
        afa.sort_order
      FROM academic_feedback_areas afa
      WHERE afa.form_id = ?
      ORDER BY afa.sort_order
    `, [id]);

    const [questions] = await pool.execute(`
      SELECT 
        afq.id,
        afq.area_id,
        afq.question_text,
        afq.question_type,
        afq.is_mandatory,
        afq.scale_min,
        afq.scale_max,
        afq.scale_min_label,
        afq.scale_max_label,
        afq.sort_order
      FROM academic_feedback_questions afq
      WHERE afq.form_id = ?
      ORDER BY afq.area_id, afq.sort_order
    `, [id]);

    for (let question of questions) {
      if (question.question_type === 'multiple_choice') {
        const [options] = await pool.execute(`
          SELECT id, option_text, sort_order FROM academic_question_options WHERE question_id = ? ORDER BY sort_order
        `, [question.id]);
        question.options = options;
      }
    }

    // Debug: log counts and sample questions to help diagnose missing questions
    try {
      console.log('DEBUG: Faculty GET - fetched areas count=', areas.length, 'questions count=', questions.length);
      if (questions.length > 0) console.log('DEBUG: Faculty GET - sample question[0]=', questions[0]);
    } catch (e) { /* ignore logging errors */ }

    const areasWithQuestions = areas.map(area => ({
      ...area,
      questions: questions.filter(q => q.area_id === area.id)
    }));

    // Also log how many questions were attached to areas
    try {
      const attachedCount = areasWithQuestions.reduce((s, a) => s + (a.questions ? a.questions.length : 0), 0);
      console.log('DEBUG: Faculty GET - questions attached to areas=', attachedCount, 'questions unassigned=', questions.filter(q => q.area_id === null || q.area_id === undefined).length);
    } catch (e) {}

    res.json({ success: true, data: { ...form, areas: areasWithQuestions, allQuestions: questions } });
  } catch (error) {
    console.error('Error fetching public faculty feedback form:', error);
    res.status(500).json({ success: false, message: 'Error fetching form', error: error.message });
  }
});

// PUBLIC: Get active faculty feedback form (no auth) - used by student portal
router.get('/public/active', async (req, res) => {
  try {
    const [forms] = await pool.execute(`
      SELECT aff.id FROM academic_feedback_forms aff
      WHERE aff.form_type = 'faculty_feedback' AND aff.status = 'Active'
      ORDER BY aff.updated_at DESC LIMIT 1
    `);

    if (forms.length === 0) return res.status(404).json({ success: false, message: 'No active faculty feedback form' });

    const formId = forms[0].id;
    // Reuse public/:id logic by querying details
    const [details] = await pool.execute(`
      SELECT 
        aff.*,
        afff.department_id,
        afff.semester_id,
        afff.target_faculty_ids,
        d.name as department_name,
        acs.semester_name
      FROM academic_feedback_forms aff
      LEFT JOIN academic_faculty_feedback_forms afff ON aff.id = afff.form_id
      LEFT JOIN departments d ON afff.department_id = d.id
      LEFT JOIN academic_semesters acs ON afff.semester_id = acs.id
      WHERE aff.id = ?
    `, [formId]);

    const form = details[0];
    const [areas] = await pool.execute('SELECT id, area_name, area_description, is_mandatory, sort_order FROM academic_feedback_areas WHERE form_id = ? ORDER BY sort_order', [formId]);
    const [questions] = await pool.execute('SELECT id, area_id, question_text, question_type, is_mandatory, scale_min, scale_max, scale_min_label, scale_max_label, sort_order FROM academic_feedback_questions WHERE form_id = ? ORDER BY area_id, sort_order', [formId]);

    for (let question of questions) {
      if (question.question_type === 'multiple_choice') {
        const [options] = await pool.execute('SELECT id, option_text, sort_order FROM academic_question_options WHERE question_id = ? ORDER BY sort_order', [question.id]);
        question.options = options;
      }
    }

    const areasWithQuestions = areas.map(area => ({ ...area, questions: questions.filter(q => q.area_id === area.id) }));

    res.json({ success: true, data: { ...form, areas: areasWithQuestions, allQuestions: questions } });
  } catch (error) {
    console.error('Error fetching active faculty form:', error);
    res.status(500).json({ success: false, message: 'Error fetching active form', error: error.message });
  }
});

// CREATE new faculty feedback form
router.post('/', authenticateToken, requireRole('admin', 'academic'), async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const {
      title,
      description,
      department_id,
      semester_id,
      target_faculty_ids,
      response_deadline,
      areas,
      questions,
      is_mandatory
    } = req.body;

    // Validate required fields
    if (!title || !department_id || !semester_id) {
      return res.status(400).json({
        success: false,
        message: 'Title, department_id, and semester_id are required'
      });
    }

    await connection.beginTransaction();

    // Insert main form
    const [formResult] = await connection.execute(`
      INSERT INTO academic_feedback_forms (
        form_type, title, description, department_id, semester_id, 
        status, created_by, is_mandatory
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, ['faculty_feedback', title, description, department_id, semester_id, 'Draft', req.user.id, is_mandatory || false]);

    const formId = formResult.insertId;

    // Insert faculty-specific form data
    await connection.execute(`
      INSERT INTO academic_faculty_feedback_forms (
        form_id, department_id, semester_id, target_faculty_ids, response_deadline
      ) VALUES (?, ?, ?, ?, ?)
    `, [
      formId,
      department_id,
      semester_id,
      target_faculty_ids ? JSON.stringify(target_faculty_ids) : null,
      response_deadline
    ]);

    // Insert areas
    if (areas && Array.isArray(areas)) {
      for (const [index, area] of areas.entries()) {
        const [areaResult] = await connection.execute(`
          INSERT INTO academic_feedback_areas (
            form_id, area_name, area_description, sort_order, is_mandatory
          ) VALUES (?, ?, ?, ?, ?)
        `, [formId, area.name, area.description || null, index, area.isMandatory !== false]);
        
        // Insert questions for this area
        if (area.questions && Array.isArray(area.questions)) {
          for (const [qIndex, question] of area.questions.entries()) {
            const [qResult] = await connection.execute(`
              INSERT INTO academic_feedback_questions (
                form_id, area_id, question_text, question_type, is_mandatory,
                scale_min, scale_max, scale_min_label, scale_max_label, sort_order
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
              formId,
              areaResult.insertId,
              question.text,
              question.type || 'rating',
              question.is_mandatory !== false,
              question.scale_min || 1,
              question.scale_max || 5,
              question.scale_min_label,
              question.scale_max_label,
              qIndex
            ]);

            // Insert options for multiple choice
            if (question.type === 'multiple_choice' && question.options) {
              for (const [oIndex, option] of question.options.entries()) {
                await connection.execute(`
                  INSERT INTO academic_question_options (
                    question_id, option_text, sort_order
                  ) VALUES (?, ?, ?)
                `, [qResult.insertId, option, oIndex]);
              }
            }
          }
        }
      }
    } else if (questions && Array.isArray(questions)) {
      // If questions are provided directly without areas
      for (const [index, question] of questions.entries()) {
        const [qResult] = await connection.execute(`
          INSERT INTO academic_feedback_questions (
            form_id, question_text, question_type, is_mandatory,
            scale_min, scale_max, scale_min_label, scale_max_label, sort_order
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          formId,
          question.text,
          question.type || 'rating',
          question.is_mandatory !== false,
          question.scale_min || 1,
          question.scale_max || 5,
          question.scale_min_label,
          question.scale_max_label,
          index
        ]);

        // Insert options for multiple choice
        if (question.type === 'multiple_choice' && question.options) {
          for (const [oIndex, option] of question.options.entries()) {
            await connection.execute(`
              INSERT INTO academic_question_options (
                question_id, option_text, sort_order
              ) VALUES (?, ?, ?)
            `, [qResult.insertId, option, oIndex]);
          }
        }
      }
    }

    // Insert audit log
    await connection.execute(`
      INSERT INTO academic_feedback_audit_log (
        form_id, action, action_by, ip_address
      ) VALUES (?, ?, ?, ?)
    `, [formId, 'create', req.user.id, req.ip]);

    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Faculty feedback form created successfully',
      data: { id: formId }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating faculty feedback form:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating faculty feedback form',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// UPDATE faculty feedback form
router.put('/:id', authenticateToken, requireRole('admin', 'academic'), async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { id } = req.params;
    const {
      title,
      description,
      department_id,
      semester_id,
      status,
      target_faculty_ids,
      response_deadline,
      areas,
      questions
    } = req.body;

    // Verify form exists
    const [forms] = await connection.execute(
      'SELECT * FROM academic_feedback_forms WHERE id = ? AND form_type = ?',
      [id, 'faculty_feedback']
    );

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Faculty feedback form not found' });
    }

    await connection.beginTransaction();

    // Update main form
    const updateFields = [];
    const updateValues = [];

    if (title) {
      updateFields.push('title = ?');
      updateValues.push(title);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }
    if (status) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }

    if (updateFields.length > 0) {
      updateFields.push('updated_at = NOW()');
      updateValues.push(id);

      await connection.execute(
        `UPDATE academic_feedback_forms SET ${updateFields.join(', ')} WHERE id = ?`,
        updateValues
      );
    }

    // Update faculty-specific data
    if (department_id || semester_id || target_faculty_ids || response_deadline) {
      const updateFacultyFields = [];
      const updateFacultyValues = [];

      if (department_id) {
        updateFacultyFields.push('department_id = ?');
        updateFacultyValues.push(department_id);
      }
      if (semester_id) {
        updateFacultyFields.push('semester_id = ?');
        updateFacultyValues.push(semester_id);
      }
      if (target_faculty_ids) {
        updateFacultyFields.push('target_faculty_ids = ?');
        updateFacultyValues.push(JSON.stringify(target_faculty_ids));
      }
      if (response_deadline) {
        updateFacultyFields.push('response_deadline = ?');
        updateFacultyValues.push(response_deadline);
      }

      if (updateFacultyFields.length > 0) {
        updateFacultyFields.push('updated_at = NOW()');
        updateFacultyValues.push(id);

        await connection.execute(
          `UPDATE academic_faculty_feedback_forms SET ${updateFacultyFields.join(', ')} WHERE form_id = ?`,
          updateFacultyValues
        );
      }
    }

    // Update areas and questions if provided
    if (areas && Array.isArray(areas)) {
      // Delete existing areas (cascades to questions)
      await connection.execute(
        'DELETE FROM academic_feedback_areas WHERE form_id = ?',
        [id]
      );

      // Insert new areas
      for (const [index, area] of areas.entries()) {
        const [areaResult] = await connection.execute(`
          INSERT INTO academic_feedback_areas (
            form_id, area_name, area_description, sort_order, is_mandatory
          ) VALUES (?, ?, ?, ?, ?)
        `, [id, area.name, area.description || null, index, area.isMandatory !== false]);

        // Insert questions for this area
        if (area.questions && Array.isArray(area.questions)) {
          for (const [qIndex, question] of area.questions.entries()) {
            const [qResult] = await connection.execute(`
              INSERT INTO academic_feedback_questions (
                form_id, area_id, question_text, question_type, is_mandatory,
                scale_min, scale_max, scale_min_label, scale_max_label, sort_order
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [
              id,
              areaResult.insertId,
              question.text,
              question.type || 'rating',
              question.is_mandatory !== false,
              question.scale_min || 1,
              question.scale_max || 5,
              question.scale_min_label,
              question.scale_max_label,
              qIndex
            ]);

            // Insert options for multiple choice
            if (question.type === 'multiple_choice' && question.options) {
              for (const [oIndex, option] of question.options.entries()) {
                await connection.execute(`
                  INSERT INTO academic_question_options (
                    question_id, option_text, sort_order
                  ) VALUES (?, ?, ?)
                `, [qResult.insertId, option, oIndex]);
              }
            }
          }
        }
      }
    }

    // Insert audit log
    await connection.execute(`
      INSERT INTO academic_feedback_audit_log (
        form_id, action, action_by, ip_address
      ) VALUES (?, ?, ?, ?)
    `, [id, 'update', req.user.id, req.ip]);

    await connection.commit();

    res.json({
      success: true,
      message: 'Faculty feedback form updated successfully',
      data: { id }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating faculty feedback form:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating faculty feedback form',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// TOGGLE form status (Active/Inactive)
router.patch('/:id/status', authenticateToken, requireRole('admin', 'academic'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Inactive', 'Draft'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    // If activating this form, deactivate all other faculty feedback forms
    if (status === 'Active') {
      await pool.execute(`
        UPDATE academic_feedback_forms 
        SET status = 'Inactive' 
        WHERE form_type = 'faculty_feedback' AND id != ? AND status = 'Active'
      `, [id]);
    }

    const [result] = await pool.execute(`
      UPDATE academic_feedback_forms 
      SET status = ?, updated_at = NOW()
      WHERE id = ? AND form_type = 'faculty_feedback'
    `, [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Faculty feedback form not found' });
    }

    // Insert audit log
    await pool.execute(`
      INSERT INTO academic_feedback_audit_log (
        form_id, action, action_by, action_details, ip_address
      ) VALUES (?, ?, ?, ?, ?)
    `, [id, 'update_status', req.user.id, `Status changed to ${status}`, req.ip]);

    res.json({
      success: true,
      message: `Form status updated to ${status}`,
      data: { id, status }
    });
  } catch (error) {
    console.error('Error toggling form status:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling form status',
      error: error.message
    });
  }
});

// DELETE faculty feedback form
router.delete('/:id', authenticateToken, requireRole('admin', 'academic'), async (req, res) => {
  const connection = await pool.getConnection();
  
  try {
    const { id } = req.params;

    // Check if form exists
    const [forms] = await connection.execute(
      'SELECT * FROM academic_feedback_forms WHERE id = ? AND form_type = ?',
      [id, 'faculty_feedback']
    );

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Faculty feedback form not found' });
    }

    await connection.beginTransaction();

    // Delete form (cascades to related tables)
    await connection.execute(
      'DELETE FROM academic_feedback_forms WHERE id = ?',
      [id]
    );

    // Insert audit log
    await connection.execute(`
      INSERT INTO academic_feedback_audit_log (
        form_id, action, action_by, ip_address
      ) VALUES (?, ?, ?, ?)
    `, [id, 'delete', req.user.id, req.ip]);

    await connection.commit();

    res.json({
      success: true,
      message: 'Faculty feedback form deleted successfully',
      data: { id }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting faculty feedback form:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting faculty feedback form',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

module.exports = router;

// DEBUG: admin-only helper - dump faculty-related rows for a form (temporary)
router.get('/debug/dump/:form_id', async (req, res) => {
  try {
    const { form_id } = req.params;
    const [forms] = await pool.execute('SELECT * FROM academic_feedback_forms WHERE id = ?', [form_id]);
    const [facForms] = await pool.execute('SELECT * FROM academic_faculty_feedback_forms WHERE form_id = ?', [form_id]);
    const [areas] = await pool.execute('SELECT * FROM academic_feedback_areas WHERE form_id = ?', [form_id]);
    const [questions] = await pool.execute('SELECT * FROM academic_feedback_questions WHERE form_id = ?', [form_id]);
    const qIds = questions.map(q => q.id);
    const [options] = qIds.length > 0 ? await pool.execute('SELECT * FROM academic_question_options WHERE question_id IN (?)', [qIds]) : [[],];

    res.json({ success: true, data: { forms: forms[0] || null, faculty_form: facForms[0] || null, areas, questions, options } });
  } catch (error) {
    console.error('DEBUG dump error:', error);
    res.status(500).json({ success: false, message: 'Error dumping debug data', error: error.message });
  }
});
