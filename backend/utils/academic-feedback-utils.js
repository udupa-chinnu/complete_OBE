const pool = require('../config/database');

// ============================================
// FEEDBACK MANAGEMENT UTILITIES
// ============================================

/**
 * Get all feedback forms by type
 */
async function getFeedbackFormsByType(formType, includeInactive = false) {
  try {
    let query = 'SELECT * FROM academic_feedback_forms WHERE form_type = ?';
    const params = [formType];

    if (!includeInactive) {
      query += ' AND status IN ("Active", "Inactive")';
    }

    query += ' ORDER BY created_at DESC';

    const [forms] = await pool.execute(query, params);
    return forms;
  } catch (error) {
    throw new Error(`Error fetching forms: ${error.message}`);
  }
}

/**
 * Get form with all details (areas, questions, options)
 */
async function getFormWithDetails(formId) {
  try {
    // Get main form
    const [forms] = await pool.execute(
      'SELECT * FROM academic_feedback_forms WHERE id = ?',
      [formId]
    );

    if (forms.length === 0) {
      throw new Error('Form not found');
    }

    const form = forms[0];

    // Get areas
    const [areas] = await pool.execute(
      'SELECT * FROM academic_feedback_areas WHERE form_id = ? ORDER BY sort_order',
      [formId]
    );

    // Get questions
    const [questions] = await pool.execute(
      'SELECT * FROM academic_feedback_questions WHERE form_id = ? ORDER BY area_id, sort_order',
      [formId]
    );

    // Get options for each question
    for (const question of questions) {
      if (question.question_type === 'multiple_choice') {
        const [options] = await pool.execute(
          'SELECT * FROM academic_question_options WHERE question_id = ? ORDER BY sort_order',
          [question.id]
        );
        question.options = options;
      }
    }

    // Group questions by area
    const areasWithQuestions = areas.map(area => ({
      ...area,
      questions: questions.filter(q => q.area_id === area.id)
    }));

    return {
      ...form,
      areas: areasWithQuestions,
      allQuestions: questions
    };
  } catch (error) {
    throw new Error(`Error fetching form details: ${error.message}`);
  }
}

/**
 * Deactivate all forms of a specific type except one
 */
async function deactivateOtherForms(formType, exceptFormId) {
  try {
    await pool.execute(
      `UPDATE academic_feedback_forms 
       SET status = 'Inactive' 
       WHERE form_type = ? AND id != ? AND status = 'Active'`,
      [formType, exceptFormId]
    );
  } catch (error) {
    throw new Error(`Error deactivating forms: ${error.message}`);
  }
}

/**
 * Calculate form completion statistics
 */
async function getFormStatistics(formId) {
  try {
    const [stats] = await pool.execute(`
      SELECT 
        COUNT(DISTINCT afr.id) as total_responses,
        SUM(CASE WHEN afr.response_status = 'Submitted' THEN 1 ELSE 0 END) as submitted_responses,
        SUM(CASE WHEN afr.response_status = 'InProgress' THEN 1 ELSE 0 END) as in_progress_responses,
        ROUND(AVG(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as average_rating,
        COUNT(DISTINCT afq.id) as total_questions
      FROM academic_feedback_responses afr
      LEFT JOIN academic_answer_details ad ON afr.id = ad.response_id
      LEFT JOIN academic_feedback_questions afq ON afr.form_id = afq.form_id
      WHERE afr.form_id = ?
    `, [formId]);

    return stats[0];
  } catch (error) {
    throw new Error(`Error calculating statistics: ${error.message}`);
  }
}

/**
 * Get question-wise analytics
 */
async function getQuestionAnalytics(formId) {
  try {
    const [questions] = await pool.execute(`
      SELECT 
        afq.id,
        afq.question_text,
        afq.question_type,
        afa.area_name,
        COUNT(DISTINCT ad.response_id) as response_count,
        ROUND(AVG(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as average_rating,
        MIN(ad.answer_rating) as min_rating,
        MAX(ad.answer_rating) as max_rating
      FROM academic_feedback_questions afq
      LEFT JOIN academic_feedback_areas afa ON afq.area_id = afa.id
      LEFT JOIN academic_answer_details ad ON afq.id = ad.question_id
      WHERE afq.form_id = ?
      GROUP BY afq.id
      ORDER BY afa.sort_order, afq.sort_order
    `, [formId]);

    // Get detailed distribution for each question
    for (const question of questions) {
      if (question.question_type === 'rating') {
        const [distribution] = await pool.execute(`
          SELECT 
            ad.answer_rating as rating,
            COUNT(*) as count
          FROM academic_answer_details ad
          WHERE ad.question_id = ? AND ad.answer_rating IS NOT NULL
          GROUP BY ad.answer_rating
          ORDER BY ad.answer_rating
        `, [question.id]);
        question.ratingDistribution = distribution;
      }
    }

    return questions;
  } catch (error) {
    throw new Error(`Error getting question analytics: ${error.message}`);
  }
}

/**
 * Get faculty feedback summary
 */
async function getFacultyFeedbackSummary(facultyId, semesterId = null) {
  try {
    let query = `
      SELECT 
        aff.id,
        aff.title,
        COUNT(DISTINCT afr.id) as total_responses,
        ROUND(AVG(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as average_rating,
        d.name as department_name,
        acs.semester_name
      FROM academic_feedback_forms aff
      LEFT JOIN academic_feedback_responses afr ON aff.id = afr.form_id AND afr.faculty_id = ? AND afr.response_status = 'Submitted'
      LEFT JOIN academic_feedback_questions afq ON aff.id = afq.form_id
      LEFT JOIN academic_answer_details ad ON afq.id = ad.question_id
      LEFT JOIN academic_faculty_feedback_forms afff ON aff.id = afff.form_id
      LEFT JOIN departments d ON afff.department_id = d.id
      LEFT JOIN academic_semesters acs ON afff.semester_id = acs.id
      WHERE aff.form_type = 'faculty_feedback'
    `;

    const params = [facultyId];

    if (semesterId) {
      query += ' AND afff.semester_id = ?';
      params.push(semesterId);
    }

    query += ' GROUP BY aff.id ORDER BY aff.created_at DESC';

    const [summary] = await pool.execute(query, params);
    return summary;
  } catch (error) {
    throw new Error(`Error getting faculty feedback summary: ${error.message}`);
  }
}

/**
 * Get graduate exit survey responses by batch
 */
async function getGraduateExitSurveyByBatch(batchStartYear, batchEndYear) {
  try {
    const [surveys] = await pool.execute(`
      SELECT 
        aff.id,
        aff.title,
        COUNT(DISTINCT afr.id) as total_responses,
        ROUND(AVG(CAST(ad.answer_rating AS DECIMAL(3,2))), 2) as average_rating,
        d.name as department_name
      FROM academic_feedback_forms aff
      LEFT JOIN academic_graduate_exit_forms agef ON aff.id = agef.form_id
      LEFT JOIN departments d ON agef.department_id = d.id
      LEFT JOIN academic_feedback_responses afr ON aff.id = afr.form_id AND afr.response_status = 'Submitted'
      LEFT JOIN academic_feedback_questions afq ON aff.id = afq.form_id
      LEFT JOIN academic_answer_details ad ON afq.id = ad.question_id
      WHERE aff.form_type = 'graduate_exit_survey' 
        AND agef.batch_start_year = ? 
        AND agef.batch_end_year = ?
      GROUP BY aff.id
    `, [batchStartYear, batchEndYear]);

    return surveys;
  } catch (error) {
    throw new Error(`Error getting graduate exit survey: ${error.message}`);
  }
}

/**
 * Validate feedback response before submission
 */
async function validateFeedbackResponse(formId, answers) {
  try {
    // Get all mandatory questions for the form
    const [mandatoryQuestions] = await pool.execute(`
      SELECT id FROM academic_feedback_questions 
      WHERE form_id = ? AND is_mandatory = TRUE
    `, [formId]);

    // Check if all mandatory questions have been answered
    const answeredQuestionIds = Object.keys(answers).map(k => parseInt(k));
    const unansweredMandatory = mandatoryQuestions.filter(
      q => !answeredQuestionIds.includes(q.id)
    );

    if (unansweredMandatory.length > 0) {
      throw new Error(`Mandatory questions not answered: ${unansweredMandatory.length}`);
    }

    return { valid: true };
  } catch (error) {
    return { 
      valid: false, 
      message: error.message 
    };
  }
}

/**
 * Log audit entry
 */
async function logAuditEntry(formId, action, userId, ipAddress, details = null) {
  try {
    await pool.execute(`
      INSERT INTO academic_feedback_audit_log (
        form_id, action, action_by, ip_address, action_details
      ) VALUES (?, ?, ?, ?, ?)
    `, [formId, action, userId, ipAddress, details ? JSON.stringify(details) : null]);
  } catch (error) {
    console.error(`Error logging audit entry: ${error.message}`);
  }
}

/**
 * Get audit logs for a form
 */
async function getAuditLogs(formId, limit = 50) {
  try {
    const [logs] = await pool.execute(`
      SELECT 
        afl.id,
        afl.action,
        u.username as performed_by,
        afl.action_details,
        afl.created_at
      FROM academic_feedback_audit_log afl
      LEFT JOIN users u ON afl.action_by = u.id
      WHERE afl.form_id = ?
      ORDER BY afl.created_at DESC
      LIMIT ?
    `, [formId, limit]);

    return logs;
  } catch (error) {
    throw new Error(`Error getting audit logs: ${error.message}`);
  }
}

/**
 * Export form data to JSON
 */
async function exportFormToJSON(formId) {
  try {
    const formData = await getFormWithDetails(formId);
    return JSON.stringify(formData, null, 2);
  } catch (error) {
    throw new Error(`Error exporting form: ${error.message}`);
  }
}

/**
 * Check if user has already responded to a form
 */
async function hasUserResponded(formId, userId) {
  try {
    const [responses] = await pool.execute(`
      SELECT id FROM academic_feedback_responses 
      WHERE form_id = ? AND respondent_user_id = ? AND response_status = 'Submitted'
      LIMIT 1
    `, [formId, userId]);

    return responses.length > 0;
  } catch (error) {
    throw new Error(`Error checking user response: ${error.message}`);
  }
}

/**
 * Get eligible respondents for a form
 */
async function getEligibleRespondents(formId) {
  try {
    const [form] = await pool.execute(
      'SELECT form_type FROM academic_feedback_forms WHERE id = ?',
      [formId]
    );

    if (form.length === 0) throw new Error('Form not found');

    const formType = form[0].form_type;
    let query = '';

    if (formType === 'faculty_feedback') {
      query = `
        SELECT DISTINCT u.id, u.username, u.email, 'Faculty' as type
        FROM users u
        WHERE u.user_type = 'faculty' AND u.is_active = TRUE
      `;
    } else if (formType === 'institution_feedback') {
      query = `
        SELECT DISTINCT u.id, u.username, u.email, u.user_type
        FROM users u
        WHERE u.is_active = TRUE
      `;
    } else if (formType === 'graduate_exit_survey') {
      query = `
        SELECT DISTINCT u.id, u.username, u.email, 'Graduate' as type
        FROM users u
        WHERE u.user_type = 'student' AND u.is_active = TRUE
      `;
    }

    const [respondents] = await pool.execute(query);
    return respondents;
  } catch (error) {
    throw new Error(`Error getting eligible respondents: ${error.message}`);
  }
}

module.exports = {
  getFeedbackFormsByType,
  getFormWithDetails,
  deactivateOtherForms,
  getFormStatistics,
  getQuestionAnalytics,
  getFacultyFeedbackSummary,
  getGraduateExitSurveyByBatch,
  validateFeedbackResponse,
  logAuditEntry,
  getAuditLogs,
  exportFormToJSON,
  hasUserResponded,
  getEligibleRespondents
};
