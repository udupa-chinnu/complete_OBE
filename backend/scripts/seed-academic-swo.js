#!/usr/bin/env node
/**
 * Seed script for Academic SWO (Student Welfare & Outcome) module
 * Initializes the database with sample data for testing and demo
 */

const pool = require('../config/database');

async function seedAcademicSWOData() {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    console.log('🌱 Starting Academic SWO Data Seeding...\n');

    // ============================================
    // 1. Create Semesters
    // ============================================
    console.log('Creating semesters...');

    const semesters = [
      { semester_name: 'Odd Semester 2023-24', academic_year: '2023-24', semester_type: 'Odd', start_date: '2023-08-01', end_date: '2023-12-31' },
      { semester_name: 'Even Semester 2023-24', academic_year: '2023-24', semester_type: 'Even', start_date: '2024-01-01', end_date: '2024-05-31' },
      { semester_name: 'Odd Semester 2024-25', academic_year: '2024-25', semester_type: 'Odd', start_date: '2024-08-01', end_date: '2024-12-31' },
      { semester_name: 'Even Semester 2024-25', academic_year: '2024-25', semester_type: 'Even', start_date: '2025-01-01', end_date: '2025-05-31' }
    ];

    let semesterIds = {};
    for (const semester of semesters) {
      const [result] = await connection.execute(
        `INSERT IGNORE INTO academic_semesters 
         (semester_name, academic_year, semester_type, start_date, end_date, is_active) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [semester.semester_name, semester.academic_year, semester.semester_type, semester.start_date, semester.end_date, true]
      );
      if (result.insertId) {
        semesterIds[semester.semester_name] = result.insertId;
      } else {
        // Fetch existing
        const [existing] = await connection.execute(
          'SELECT id FROM academic_semesters WHERE semester_name = ?',
          [semester.semester_name]
        );
        semesterIds[semester.semester_name] = existing[0].id;
      }
    }

    console.log('✓ Semesters created\n');

    // ============================================
    // 2. Create Academic Batches
    // ============================================
    console.log('Creating batches...');

    const [departments] = await connection.execute('SELECT id FROM departments LIMIT 5');
    
    const batches = [
      { batch_name: '2020-2024', start_year: 2020, end_year: 2024, department_id: departments[0]?.id || null },
      { batch_name: '2021-2025', start_year: 2021, end_year: 2025, department_id: departments[0]?.id || null },
      { batch_name: '2022-2026', start_year: 2022, end_year: 2026, department_id: departments[0]?.id || null }
    ];

    for (const batch of batches) {
      await connection.execute(
        `INSERT IGNORE INTO academic_batches 
         (batch_name, start_year, end_year, department_id, is_active) 
         VALUES (?, ?, ?, ?, ?)`,
        [batch.batch_name, batch.start_year, batch.end_year, batch.department_id, true]
      );
    }

    console.log('✓ Batches created\n');

    // ============================================
    // 3. Create Faculty Feedback Form
    // ============================================
    console.log('Creating Faculty Feedback Form...');

    const [user] = await connection.execute(
      'SELECT id FROM users WHERE user_type = "academic" LIMIT 1'
    );

    const userId = user[0]?.id || 1;
    const deptId = departments[0]?.id || 1;
    const semId = Object.values(semesterIds)[0];

    const [facultyForm] = await connection.execute(
      `INSERT INTO academic_feedback_forms 
       (form_type, title, description, department_id, semester_id, status, created_by, is_mandatory)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'faculty_feedback',
        'Faculty Performance Evaluation - 2024',
        'Comprehensive faculty performance evaluation form for academic excellence',
        deptId,
        semId,
        'Active',
        userId,
        true
      ]
    );

    const facultyFormId = facultyForm.insertId;

    // Insert faculty feedback form specific data
    await connection.execute(
      `INSERT INTO academic_faculty_feedback_forms 
       (form_id, department_id, semester_id, response_deadline)
       VALUES (?, ?, ?, ?)`,
      [facultyFormId, deptId, semId, new Date('2024-12-31')]
    );

    // Add areas for faculty feedback
    const facultyAreas = [
      { name: 'Teaching Quality', description: 'Effectiveness of teaching methods and content delivery', mandatory: true },
      { name: 'Course Content', description: 'Relevance and comprehensiveness of course material', mandatory: true },
      { name: 'Student Support', description: 'Support and guidance provided to students', mandatory: true },
      { name: 'Assessment Methods', description: 'Fairness and effectiveness of evaluation methods', mandatory: false }
    ];

    let facultyAreaIds = [];
    for (const [index, area] of facultyAreas.entries()) {
      const [areaResult] = await connection.execute(
        `INSERT INTO academic_feedback_areas 
         (form_id, area_name, area_description, sort_order, is_mandatory)
         VALUES (?, ?, ?, ?, ?)`,
        [facultyFormId, area.name, area.description, index, area.mandatory]
      );
      facultyAreaIds.push(areaResult.insertId);
    }

    // Add questions for faculty feedback
    const facultyQuestions = [
      { areaIdx: 0, text: 'The faculty is well-prepared and delivers content effectively', scale_min: 1, scale_max: 5 },
      { areaIdx: 0, text: 'Faculty encourages student participation and interaction', scale_min: 1, scale_max: 5 },
      { areaIdx: 1, text: 'The course content is relevant to industry needs', scale_min: 1, scale_max: 5 },
      { areaIdx: 1, text: 'Course materials are comprehensive and up-to-date', scale_min: 1, scale_max: 5 },
      { areaIdx: 2, text: 'Faculty is approachable and provides timely support', scale_min: 1, scale_max: 5 },
      { areaIdx: 2, text: 'Mentoring and guidance are valuable for student development', scale_min: 1, scale_max: 5 },
      { areaIdx: 3, text: 'Evaluation methods are fair and transparent', scale_min: 1, scale_max: 5 }
    ];

    for (const [qIndex, question] of facultyQuestions.entries()) {
      await connection.execute(
        `INSERT INTO academic_feedback_questions 
         (form_id, area_id, question_text, question_type, scale_min, scale_max, scale_min_label, scale_max_label, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          facultyFormId,
          facultyAreaIds[question.areaIdx],
          question.text,
          'rating',
          question.scale_min,
          question.scale_max,
          'Strongly Disagree',
          'Strongly Agree',
          qIndex
        ]
      );
    }

    console.log('✓ Faculty Feedback Form created\n');

    // ============================================
    // 4. Create Institution Feedback Form
    // ============================================
    console.log('Creating Institution Feedback Form...');

    const [instForm] = await connection.execute(
      `INSERT INTO academic_feedback_forms 
       (form_type, title, description, semester_id, status, created_by, is_mandatory)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        'institution_feedback',
        'Institution Infrastructure & Services Feedback - 2024',
        'Feedback on institutional facilities, infrastructure, and support services',
        semId,
        'Active',
        userId,
        false
      ]
    );

    const instFormId = instForm.insertId;

    // Insert institution feedback form specific data
    await connection.execute(
      `INSERT INTO academic_institution_feedback_forms 
       (form_id, semester_id, target_user_types, response_deadline)
       VALUES (?, ?, ?, ?)`,
      [instFormId, semId, JSON.stringify(['faculty', 'student', 'staff']), new Date('2024-12-31')]
    );

    // Add areas for institution feedback
    const instAreas = [
      { name: 'Academic Facilities', description: 'Classrooms, labs, and learning resources', mandatory: true },
      { name: 'General Facilities', description: 'Canteen, sports, parking, and amenities', mandatory: true },
      { name: 'Administrative Services', description: 'Office services and support staff', mandatory: false },
      { name: 'Campus Safety', description: 'Security and safety measures', mandatory: true }
    ];

    let instAreaIds = [];
    for (const [index, area] of instAreas.entries()) {
      const [areaResult] = await connection.execute(
        `INSERT INTO academic_feedback_areas 
         (form_id, area_name, area_description, sort_order, is_mandatory)
         VALUES (?, ?, ?, ?, ?)`,
        [instFormId, area.name, area.description, index, area.mandatory]
      );
      instAreaIds.push(areaResult.insertId);
    }

    // Add questions for institution feedback
    const instQuestions = [
      { areaIdx: 0, text: 'Classrooms are well-equipped and comfortable', scale_min: 1, scale_max: 5 },
      { areaIdx: 0, text: 'Laboratory facilities are adequate and well-maintained', scale_min: 1, scale_max: 5 },
      { areaIdx: 0, text: 'Internet connectivity and Wi-Fi are reliable', scale_min: 1, scale_max: 5 },
      { areaIdx: 1, text: 'Canteen provides quality food at reasonable prices', scale_min: 1, scale_max: 5 },
      { areaIdx: 1, text: 'Sports and recreational facilities are satisfactory', scale_min: 1, scale_max: 5 },
      { areaIdx: 2, text: 'Administrative staff are responsive and helpful', scale_min: 1, scale_max: 5 },
      { areaIdx: 3, text: 'Campus security is effective and visible', scale_min: 1, scale_max: 5 }
    ];

    for (const [qIndex, question] of instQuestions.entries()) {
      await connection.execute(
        `INSERT INTO academic_feedback_questions 
         (form_id, area_id, question_text, question_type, scale_min, scale_max, scale_min_label, scale_max_label, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          instFormId,
          instAreaIds[question.areaIdx],
          question.text,
          'rating',
          question.scale_min,
          question.scale_max,
          'Very Poor',
          'Excellent',
          qIndex
        ]
      );
    }

    console.log('✓ Institution Feedback Form created\n');

    // ============================================
    // 5. Create Graduate Exit Survey Form
    // ============================================
    console.log('Creating Graduate Exit Survey Form...');

    const [gesForm] = await connection.execute(
      `INSERT INTO academic_feedback_forms 
       (form_type, title, description, status, created_by, is_mandatory)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        'graduate_exit_survey',
        'Graduate Exit Survey - 2024',
        'Comprehensive survey for graduating students to assess program outcomes and satisfaction',
        'Active',
        userId,
        true
      ]
    );

    const gesFormId = gesForm.insertId;

    // Insert graduate exit survey specific data
    await connection.execute(
      `INSERT INTO academic_graduate_exit_forms 
       (form_id, batch_start_year, batch_end_year, department_id, response_deadline)
       VALUES (?, ?, ?, ?, ?)`,
      [gesFormId, 2020, 2024, deptId, new Date('2024-06-30')]
    );

    // Add areas for graduate exit survey
    const gesAreas = [
      { name: 'Personal Details', mandatory: true },
      { name: 'Placement Details', mandatory: true },
      { name: 'Quality of Instructions', mandatory: true },
      { name: 'Campus Facilities', mandatory: true },
      { name: 'Overall Satisfaction', mandatory: true }
    ];

    let gesAreaIds = [];
    for (const [index, area] of gesAreas.entries()) {
      const [areaResult] = await connection.execute(
        `INSERT INTO academic_feedback_areas 
         (form_id, area_name, area_description, sort_order, is_mandatory)
         VALUES (?, ?, ?, ?, ?)`,
        [gesFormId, area.name, '', index, area.mandatory]
      );
      gesAreaIds.push(areaResult.insertId);
    }

    // Add questions for graduate exit survey
    const gesQuestions = [
      { areaIdx: 1, text: 'Placement Status (On Campus / Off Campus / Not Placed)', type: 'text' },
      { areaIdx: 1, text: 'Company Name & Designation', type: 'text' },
      { areaIdx: 2, text: 'Quality of teaching was excellent', scale_min: 1, scale_max: 5 },
      { areaIdx: 2, text: 'Faculty provided good mentoring and support', scale_min: 1, scale_max: 5 },
      { areaIdx: 3, text: 'Campus facilities met academic needs', scale_min: 1, scale_max: 5 },
      { areaIdx: 3, text: 'Infrastructure supported practical learning', scale_min: 1, scale_max: 5 },
      { areaIdx: 4, text: 'Overall, I am satisfied with my education at this institution', scale_min: 1, scale_max: 5 },
      { areaIdx: 4, text: 'Would you recommend this institution to others?', type: 'yes_no' }
    ];

    for (const [qIndex, question] of gesQuestions.entries()) {
      await connection.execute(
        `INSERT INTO academic_feedback_questions 
         (form_id, area_id, question_text, question_type, scale_min, scale_max, scale_min_label, scale_max_label, sort_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          gesFormId,
          gesAreaIds[question.areaIdx],
          question.text,
          question.type || 'rating',
          question.scale_min || null,
          question.scale_max || null,
          question.scale_min_label || null,
          question.scale_max_label || null,
          qIndex
        ]
      );
    }

    console.log('✓ Graduate Exit Survey Form created\n');

    // ============================================
    // 6. Create Sample Responses (Optional)
    // ============================================
    console.log('Creating sample feedback responses...');

    const [students] = await connection.execute(
      'SELECT id FROM users WHERE user_type = "student" LIMIT 3'
    );

    for (const student of students) {
      // Create faculty feedback response
      const [ffResponse] = await connection.execute(
        `INSERT INTO academic_feedback_responses 
         (form_id, respondent_user_id, respondent_type, response_status, submitted_time)
         VALUES (?, ?, ?, ?, ?)`,
        [facultyFormId, student.id, 'student', 'Submitted', new Date()]
      );

      // Add sample answers
      const [ffQuestions] = await connection.execute(
        'SELECT id FROM academic_feedback_questions WHERE form_id = ? LIMIT 5',
        [facultyFormId]
      );

      for (const question of ffQuestions) {
        await connection.execute(
          `INSERT INTO academic_answer_details 
           (response_id, question_id, answer_rating, answer_timestamp)
           VALUES (?, ?, ?, ?)`,
          [ffResponse.insertId, question.id, Math.floor(Math.random() * 5) + 1, new Date()]
        );
      }
    }

    console.log('✓ Sample responses created\n');

    await connection.commit();

    console.log('✅ Academic SWO Data Seeding Completed Successfully!\n');
    console.log('📊 Created:');
    console.log('   - 4 Semesters');
    console.log('   - 3 Batches');
    console.log('   - 3 Feedback Forms (Faculty, Institution, Graduate Exit)');
    console.log('   - Multiple Areas and Questions');
    console.log('   - Sample Responses');

  } catch (error) {
    await connection.rollback();
    console.error('❌ Error during seeding:', error.message);
    process.exit(1);
  } finally {
    connection.release();
    process.exit(0);
  }
}

// Run the seed script
seedAcademicSWOData();
