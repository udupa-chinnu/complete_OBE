const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { authenticateToken, requireRole } = require('../middleware/auth');

// ============================================
// GRADUATE EXIT SURVEY MANAGEMENT ROUTES
// ============================================

// GET all graduate exit survey forms
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { includeInactive } = req.query;

    let query = `
      SELECT 
        aff.id,
        aff.title,
        aff.description,
        aff.status,
        CONCAT(agef.batch_start_year, '-', agef.batch_end_year) as batch_name,
        agef.batch_start_year,
        agef.batch_end_year,
        d.name as department_name,
        d.id as department_id,
        COUNT(DISTINCT afr.id) as total_responses,
        COUNT(DISTINCT afq.id) as total_questions,
        u.username as created_by_name,
        aff.created_at,
        aff.updated_at
      FROM academic_feedback_forms aff
      LEFT JOIN academic_graduate_exit_forms agef ON aff.id = agef.form_id
      LEFT JOIN departments d ON agef.department_id = d.id
      LEFT JOIN academic_feedback_responses afr ON aff.id = afr.form_id AND afr.response_status = 'Submitted'
      LEFT JOIN academic_feedback_questions afq ON aff.id = afq.form_id
      LEFT JOIN users u ON aff.created_by = u.id
      WHERE aff.form_type = 'graduate_exit_survey'
    `;

    if (includeInactive !== 'true') {
      query += ' AND aff.status IN ("Active", "Inactive")';
    }

    query += ' GROUP BY aff.id ORDER BY aff.created_at DESC';

    const [forms] = await pool.execute(query);

    res.json({
      success: true,
      data: forms,
      message: 'Graduate exit survey forms retrieved successfully'
    });
  } catch (error) {
    console.error('Error fetching graduate exit survey forms:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching graduate exit survey forms',
      error: error.message
    });
  }
});

// PUBLIC: list graduate exit survey forms (no auth)
router.get('/public', async (req, res) => {
  try {
    const { includeInactive } = req.query;
    let query = `
      SELECT 
        aff.id,
        aff.title,
        aff.description,
        aff.status,
        agef.batch_start_year,
        agef.batch_end_year,
        COUNT(DISTINCT afr.id) as total_responses,
        COUNT(DISTINCT afq.id) as total_questions,
        u.username as created_by_name,
        aff.created_at,
        aff.updated_at
      FROM academic_feedback_forms aff
      LEFT JOIN academic_graduate_exit_forms agef ON aff.id = agef.form_id
      LEFT JOIN academic_feedback_responses afr ON aff.id = afr.form_id AND afr.response_status = 'Submitted'
      LEFT JOIN academic_feedback_questions afq ON aff.id = afq.form_id
      LEFT JOIN users u ON aff.created_by = u.id
      WHERE aff.form_type = 'graduate_exit_survey'
    `;
    if (includeInactive !== 'true') query += ' AND aff.status IN ("Active","Inactive")';
    query += ' GROUP BY aff.id ORDER BY aff.created_at DESC';
    const [forms] = await pool.execute(query);
    res.json({ success: true, data: forms });
  } catch (error) {
    console.error('Error fetching public graduate exit forms:', error);
    res.status(500).json({ success: false, message: 'Error fetching forms', error: error.message });
  }
});

// PUBLIC: create graduate exit form (no auth)
router.post('/public', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { title, description, batch_start_year, batch_end_year, target_user_types, response_deadline, areas, is_mandatory } = req.body;
    if (!title || !batch_start_year) return res.status(400).json({ success: false, message: 'Title and batch_start_year are required' });
    const calculatedBatchEndYear = batch_end_year || (Number(batch_start_year) + 4);
    await connection.beginTransaction();
    const [formResult] = await connection.execute(`INSERT INTO academic_feedback_forms (form_type, title, description, status, created_by, is_mandatory) VALUES (?, ?, ?, ?, ?, ?)`, ['graduate_exit_survey', title, description || null, 'Active', req.body.created_by || 1, is_mandatory || false]);
    const formId = formResult.insertId;
    await connection.execute(`INSERT INTO academic_graduate_exit_forms (form_id, batch_start_year, batch_end_year, response_deadline) VALUES (?, ?, ?, ?)`, [formId, batch_start_year || null, calculatedBatchEndYear || null, response_deadline || null]);

    if (areas && Array.isArray(areas)) {
      for (const [index, area] of areas.entries()) {
        const [areaResult] = await connection.execute(`INSERT INTO academic_feedback_areas (form_id, area_name, area_description, sort_order, is_mandatory) VALUES (?, ?, ?, ?, ?)`, [formId, area.name, area.description || null, index, area.isMandatory !== false]);
        if (area.questions && Array.isArray(area.questions)) {
          for (const [qIndex, question] of area.questions.entries()) {
            const [qResult] = await connection.execute(`INSERT INTO academic_feedback_questions (form_id, area_id, question_text, question_type, is_mandatory, scale_min, scale_max, scale_min_label, scale_max_label, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [formId, areaResult.insertId, question.text, question.type || 'rating', question.is_mandatory !== false, question.scale_min || 1, question.scale_max || 5, question.scale_min_label || null, question.scale_max_label || null, qIndex]);
            if (question.type === 'multiple_choice' && question.options) {
              for (const [oIndex, option] of question.options.entries()) await connection.execute('INSERT INTO academic_question_options (question_id, option_text, sort_order) VALUES (?, ?, ?)', [qResult.insertId, option, oIndex]);
            }
          }
        }
      }
    }

    await connection.execute('INSERT INTO academic_feedback_audit_log (form_id, action, action_by, ip_address) VALUES (?, ?, ?, ?)', [formId, 'create', req.body.created_by || 1, req.ip]);
    await connection.commit();
    res.status(201).json({ success: true, message: 'Form created', data: { id: formId } });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating public graduate form:', error);
    res.status(500).json({ success: false, message: 'Error creating form', error: error.message });
  } finally { connection.release(); }
});

// PUBLIC: update graduate form
router.put('/public/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const { title, description, batch_start_year, batch_end_year, status, target_user_types, response_deadline, areas } = req.body;
    const [forms] = await connection.execute('SELECT * FROM academic_feedback_forms WHERE id = ? AND form_type = ?', [id, 'graduate_exit_survey']);
    if (forms.length === 0) return res.status(404).json({ success: false, message: 'Form not found' });
    await connection.beginTransaction();
    const updateFields = []; const updateValues = [];
    if (title) { updateFields.push('title = ?'); updateValues.push(title); }
    if (description !== undefined) { updateFields.push('description = ?'); updateValues.push(description); }
    if (status) { updateFields.push('status = ?'); updateValues.push(status); }
    if (updateFields.length > 0) { updateFields.push('updated_at = NOW()'); updateValues.push(id); await connection.execute(`UPDATE academic_feedback_forms SET ${updateFields.join(', ')} WHERE id = ?`, updateValues); }

    if (batch_start_year !== undefined || target_user_types !== undefined || response_deadline !== undefined) {
      const uf = []; const uv = [];
      if (batch_start_year !== undefined) { uf.push('batch_start_year = ?'); uv.push(batch_start_year || null); }
      const calculatedBatchEndYear = batch_end_year !== undefined ? batch_end_year : (batch_start_year !== undefined ? Number(batch_start_year) + 4 : undefined);
      if (calculatedBatchEndYear !== undefined) { uf.push('batch_end_year = ?'); uv.push(calculatedBatchEndYear || null); }
      if (target_user_types !== undefined) { uf.push('target_user_types = ?'); uv.push(target_user_types ? JSON.stringify(target_user_types) : null); }
      if (response_deadline !== undefined) { uf.push('response_deadline = ?'); uv.push(response_deadline || null); }
      if (uf.length > 0) { uf.push('updated_at = NOW()'); uv.push(id); await connection.execute(`UPDATE academic_graduate_exit_forms SET ${uf.join(', ')} WHERE form_id = ?`, uv); }
    }

    if (areas && Array.isArray(areas)) {
      await connection.execute('DELETE FROM academic_feedback_areas WHERE form_id = ?', [id]);
      for (const [index, area] of areas.entries()) {
        const [areaResult] = await connection.execute('INSERT INTO academic_feedback_areas (form_id, area_name, area_description, sort_order, is_mandatory) VALUES (?, ?, ?, ?, ?)', [id, area.name, area.description || null, index, area.isMandatory !== false]);
        if (area.questions && Array.isArray(area.questions)) {
          for (const [qIndex, question] of area.questions.entries()) {
            const [qResult] = await connection.execute('INSERT INTO academic_feedback_questions (form_id, area_id, question_text, question_type, is_mandatory, scale_min, scale_max, scale_min_label, scale_max_label, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, areaResult.insertId, question.text, question.type || 'rating', question.is_mandatory !== false, question.scale_min || 1, question.scale_max || 5, question.scale_min_label || null, question.scale_max_label || null, qIndex]);
            if (question.type === 'multiple_choice' && question.options) { for (const [oIndex, option] of question.options.entries()) await connection.execute('INSERT INTO academic_question_options (question_id, option_text, sort_order) VALUES (?, ?, ?)', [qResult.insertId, option, oIndex]); }
          }
        }
      }
    }

    await connection.execute('INSERT INTO academic_feedback_audit_log (form_id, action, action_by, ip_address) VALUES (?, ?, ?, ?)', [id, 'update', req.body.updated_by || 1, req.ip]);
    await connection.commit();
    res.json({ success: true, message: 'Form updated' });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating public graduate form:', error);
    res.status(500).json({ success: false, message: 'Error updating form', error: error.message });
  } finally { connection.release(); }
});

// PUBLIC: toggle status
router.patch('/public/:id/status', async (req, res) => {
  try {
    const { id } = req.params; const { status } = req.body;
    if (!['Active','Inactive','Draft'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid status' });
    if (status === 'Active') { await pool.execute(`UPDATE academic_feedback_forms SET status = 'Inactive' WHERE form_type = 'graduate_exit_survey' AND id != ? AND status = 'Active'`, [id]); }
    const [result] = await pool.execute(`UPDATE academic_feedback_forms SET status = ?, updated_at = NOW() WHERE id = ? AND form_type = 'graduate_exit_survey'`, [status, id]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Form not found' });
    await pool.execute('INSERT INTO academic_feedback_audit_log (form_id, action, action_by, action_details, ip_address) VALUES (?, ?, ?, ?, ?)', [id, 'update_status', req.body.updated_by || 1, `Status changed to ${status}`, req.ip]);
    res.json({ success: true, message: `Form status updated to ${status}` });
  } catch (error) { console.error('Error toggling public graduate status:', error); res.status(500).json({ success: false, message: 'Error toggling status', error: error.message }); }
});

// PUBLIC: delete
router.delete('/public/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try { const { id } = req.params; const [forms] = await connection.execute('SELECT * FROM academic_feedback_forms WHERE id = ? AND form_type = ?', [id, 'graduate_exit_survey']); if (forms.length === 0) return res.status(404).json({ success: false, message: 'Form not found' }); await connection.beginTransaction(); await connection.execute('DELETE FROM academic_feedback_forms WHERE id = ?', [id]); await connection.execute('INSERT INTO academic_feedback_audit_log (form_id, action, action_by, ip_address) VALUES (?, ?, ?, ?)', [id, 'delete', req.body.deleted_by || 1, req.ip]); await connection.commit(); res.json({ success: true, message: 'Form deleted' }); } catch (error) { await connection.rollback(); console.error('Error deleting public graduate form:', error); res.status(500).json({ success: false, message: 'Error deleting form', error: error.message }); } finally { connection.release(); }
});

// GET single graduate exit survey form with all details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Get form details
    const [forms] = await pool.execute(`
      SELECT 
        aff.*,
        agef.batch_start_year,
        agef.batch_end_year,
        agef.department_id,
        d.name as department_name
      FROM academic_feedback_forms aff
      LEFT JOIN academic_graduate_exit_forms agef ON aff.id = agef.form_id
      LEFT JOIN departments d ON agef.department_id = d.id
      WHERE aff.id = ? AND aff.form_type = 'graduate_exit_survey'
    `, [id]);

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Graduate exit survey form not found' });
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
    console.error('Error fetching graduate exit survey form:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching graduate exit survey form',
      error: error.message
    });
  }
});

// SUBMIT responses for a graduate exit survey form (no auth required for now)
router.post('/:id/submit', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const { respondent_user_id, respondent_type = 'graduate', batch_year, answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, message: 'Answers are required' });
    }

    // Check form exists
    const [forms] = await pool.execute(
      'SELECT id FROM academic_feedback_forms WHERE id = ? AND form_type = ?',
      [id, 'graduate_exit_survey']
    );

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    await connection.beginTransaction();

    const [respResult] = await connection.execute(`
      INSERT INTO academic_feedback_responses (
        form_id, respondent_user_id, respondent_type, batch_year, response_status, ip_address, user_agent, start_time, submitted_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      id,
      respondent_user_id || 1,
      respondent_type,
      batch_year || null,
      'Submitted',
      req.ip,
      req.headers['user-agent'] || null
    ]);

    const responseId = respResult.insertId;

    for (const ans of answers) {
      const { question_id, answer_text, answer_rating, answer_option_id } = ans;
      await connection.execute(`
        INSERT INTO academic_answer_details (
          response_id, question_id, answer_text, answer_rating, answer_option_id, answer_timestamp
        ) VALUES (?, ?, ?, ?, ?, NOW())
      `, [responseId, question_id, answer_text || null, answer_rating || null, answer_option_id || null]);
    }

    await connection.execute(`
      INSERT INTO academic_feedback_audit_log (form_id, action, action_by, action_details, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `, [id, 'submit', respondent_user_id || 1, `Submitted response id ${responseId}`, req.ip]);

    await connection.commit();

    res.status(201).json({ success: true, message: 'Feedback submitted successfully', data: { responseId } });
  } catch (error) {
    await connection.rollback();
    console.error('Error submitting graduate exit survey response:', error);
    res.status(500).json({ success: false, message: 'Error submitting feedback', error: error.message });
  } finally {
    connection.release();
  }
});

// PUBLIC: Get single graduate exit survey form with details (no auth) - used by student portal
router.get('/public/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [forms] = await pool.execute(`
      SELECT 
        aff.*,
        agef.batch_start_year,
        agef.batch_end_year,
        agef.department_id,
        d.name as department_name
      FROM academic_feedback_forms aff
      LEFT JOIN academic_graduate_exit_forms agef ON aff.id = agef.form_id
      LEFT JOIN departments d ON agef.department_id = d.id
      WHERE aff.id = ? AND aff.form_type = 'graduate_exit_survey' AND aff.status = 'Active'
    `, [id]);

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Graduate exit survey form not found' });
    }

    const form = forms[0];

    const [areas] = await pool.execute('SELECT id, area_name, area_description, is_mandatory, sort_order FROM academic_feedback_areas WHERE form_id = ? ORDER BY sort_order', [id]);

    const [questions] = await pool.execute('SELECT id, area_id, question_text, question_type, is_mandatory, scale_min, scale_max, scale_min_label, scale_max_label, sort_order FROM academic_feedback_questions WHERE form_id = ? ORDER BY area_id, sort_order', [id]);

    for (let question of questions) {
      if (question.question_type === 'multiple_choice') {
        const [options] = await pool.execute('SELECT id, option_text, sort_order FROM academic_question_options WHERE question_id = ? ORDER BY sort_order', [question.id]);
        question.options = options;
      }
    }

    const areasWithQuestions = areas.map(area => ({ ...area, questions: questions.filter(q => q.area_id === area.id) }));

    res.json({ success: true, data: { ...form, areas: areasWithQuestions, allQuestions: questions } });
  } catch (error) {
    console.error('Error fetching public graduate exit form:', error);
    res.status(500).json({ success: false, message: 'Error fetching form', error: error.message });
  }
});

// CREATE new graduate exit survey form
router.post('/', authenticateToken, requireRole('admin', 'academic'), async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const {
      title,
      description,
      batch_start_year,
      batch_end_year,
      department_id,
      response_deadline,
      areas,
      questions,
      is_mandatory
    } = req.body;

    // Validate required fields
    if (!title || !batch_start_year || !batch_end_year) {
      return res.status(400).json({
        success: false,
        message: 'Title, batch_start_year, and batch_end_year are required'
      });
    }

    await connection.beginTransaction();

    // Insert main form
    const [formResult] = await connection.execute(`
      INSERT INTO academic_feedback_forms (
        form_type, title, description, status, created_by, is_mandatory
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, ['graduate_exit_survey', title, description, 'Draft', req.user.id, is_mandatory || false]);

    const formId = formResult.insertId;

    // Insert graduate exit survey-specific form data
    await connection.execute(`
      INSERT INTO academic_graduate_exit_forms (
        form_id, batch_start_year, batch_end_year, department_id, response_deadline
      ) VALUES (?, ?, ?, ?, ?)
    `, [
      formId,
      batch_start_year,
      batch_end_year,
      department_id || null,
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
      message: 'Graduate exit survey form created successfully',
      data: { id: formId }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating graduate exit survey form:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating graduate exit survey form',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

// UPDATE graduate exit survey form
router.put('/:id', authenticateToken, requireRole('admin', 'academic'), async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { id } = req.params;
    const {
      title,
      description,
      batch_start_year,
      batch_end_year,
      department_id,
      status,
      response_deadline,
      areas,
      questions
    } = req.body;

    // Verify form exists
    const [forms] = await connection.execute(
      'SELECT * FROM academic_feedback_forms WHERE id = ? AND form_type = ?',
      [id, 'graduate_exit_survey']
    );

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Graduate exit survey form not found' });
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

    // Update graduate exit survey-specific data
    if (batch_start_year !== undefined || batch_end_year !== undefined || department_id !== undefined || response_deadline !== undefined) {
      const updateGesFields = [];
      const updateGesValues = [];

      if (batch_start_year !== undefined) {
        updateGesFields.push('batch_start_year = ?');
        updateGesValues.push(batch_start_year || null);
      }
      if (batch_end_year !== undefined) {
        updateGesFields.push('batch_end_year = ?');
        updateGesValues.push(batch_end_year || null);
      }
      if (department_id !== undefined) {
        updateGesFields.push('department_id = ?');
        updateGesValues.push(department_id || null);
      }
      if (response_deadline !== undefined) {
        updateGesFields.push('response_deadline = ?');
        updateGesValues.push(response_deadline || null);
      }

      if (updateGesFields.length > 0) {
        updateGesFields.push('updated_at = NOW()');
        updateGesValues.push(id);

        await connection.execute(
          `UPDATE academic_graduate_exit_forms SET ${updateGesFields.join(', ')} WHERE form_id = ?`,
          updateGesValues
        );
      }
    }

    // Update areas and questions if provided
    if (areas && Array.isArray(areas)) {
      // Delete existing areas
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
      message: 'Graduate exit survey form updated successfully',
      data: { id }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating graduate exit survey form:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating graduate exit survey form',
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

    // If activating this form, deactivate all other graduate exit survey forms
    if (status === 'Active') {
      await pool.execute(`
        UPDATE academic_feedback_forms 
        SET status = 'Inactive' 
        WHERE form_type = 'graduate_exit_survey' AND id != ? AND status = 'Active'
      `, [id]);
    }

    const [result] = await pool.execute(`
      UPDATE academic_feedback_forms 
      SET status = ?, updated_at = NOW()
      WHERE id = ? AND form_type = 'graduate_exit_survey'
    `, [status, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Graduate exit survey form not found' });
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

// DELETE graduate exit survey form
router.delete('/:id', authenticateToken, requireRole('admin', 'academic'), async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { id } = req.params;

    // Check if form exists
    const [forms] = await connection.execute(
      'SELECT * FROM academic_feedback_forms WHERE id = ? AND form_type = ?',
      [id, 'graduate_exit_survey']
    );

    if (forms.length === 0) {
      return res.status(404).json({ success: false, message: 'Graduate exit survey form not found' });
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
      message: 'Graduate exit survey form deleted successfully',
      data: { id }
    });
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting graduate exit survey form:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting graduate exit survey form',
      error: error.message
    });
  } finally {
    connection.release();
  }
});

module.exports = router;
