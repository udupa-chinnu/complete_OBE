const mysql = require('mysql2/promise');
require('dotenv').config();

const seedInstitutionData = async () => {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'sqlchinnu123',
      database: process.env.DB_NAME || 'education_portal',
    });

    console.log('🌱 Seeding institution data...');

    // Check if institution already exists
    const [existing] = await connection.execute('SELECT id FROM institutions LIMIT 1');
    
    if (existing.length > 0) {
      console.log('⚠️  Institution data already exists. Skipping seed.');
      return;
    }

    await connection.beginTransaction();

    // Insert basic institution info
    const [institutionResult] = await connection.execute(
      `INSERT INTO institutions (
        name, code, establishment_year, institute_type, affiliation_type,
        affiliated_university, institute_category, accreditation_status,
        naac_grade, nba_accredited_programs, logo_path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Sahyadri College of Engineering & Management',
        'SCEM001',
        2001,
        'Private',
        'Affiliated',
        'Visvesvaraya Technological University',
        'Engineering',
        'Both NAAC & NBA',
        'A+',
        'Computer Science Engineering, Information Science Engineering, Electronics & Communication',
        '/images/sahyadri-logo.png'
      ]
    );

    const institutionId = institutionResult.insertId;

    // Insert contact information
    await connection.execute(
      `INSERT INTO institution_contacts (
        institution_id, address_line1, address_line2, city, district,
        state, country, pincode, official_email, official_contact,
        website, location_coordinates
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionId,
        'Adyar',
        'Mangalore',
        'Mangalore',
        'Dakshina Kannada',
        'Karnataka',
        'India',
        '575007',
        'info@sahyadri.edu.in',
        '+91 824 2277227',
        'https://www.sahyadri.edu.in',
        '12.9141° N, 74.8560° E'
      ]
    );

    // Insert governance information
    await connection.execute(
      `INSERT INTO institution_governance (
        institution_id, head_of_institution, head_designation,
        head_email, head_phone, governing_body_exists,
        governing_body_members, trust_name, registration_number,
        trust_registration_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionId,
        'Dr. Manjunath Bhandary',
        'Principal',
        'principal@sahyadri.edu.in',
        '+91 824 2277227',
        'Yes',
        '15',
        'Sahyadri Educational Trust',
        'TRUST/123/2001',
        '2001-01-15'
      ]
    );

    // Insert academic information
    await connection.execute(
      `INSERT INTO institution_academic (
        institution_id, ug_programs, pg_programs, phd_programs,
        total_departments, faculty_strength, student_intake,
        academic_calendar_available, examination_system, medium_of_instruction
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionId,
        12,
        8,
        5,
        8,
        150,
        3000,
        'Yes',
        'Semester System',
        'English'
      ]
    );

    // Insert infrastructure information
    await connection.execute(
      `INSERT INTO institution_infrastructure (
        institution_id, campus_area, built_up_area, classrooms,
        labs, library_available, internet_bandwidth, wifi_enabled,
        hostel_available, transport_available, buses_count
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionId,
        25.5,
        12.3,
        120,
        45,
        'Yes',
        1,
        'Yes',
        'Yes',
        'Yes',
        8
      ]
    );

    // Insert recognitions
    await connection.execute(
      `INSERT INTO institution_recognitions (
        institution_id, ugc_recognition_date, aicte_approval_year,
        nba_accreditation_details, naac_accreditation_details,
        iso_certification, other_awards
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionId,
        '2001-05-20',
        2001,
        'NBA Accredited: CSE, ISE, ECE',
        'NAAC Grade A+ (2020)',
        'ISO 9001:2015',
        'Best Engineering College Award 2022, Excellence in Research Award 2021'
      ]
    );

    // Insert miscellaneous information
    await connection.execute(
      `INSERT INTO institution_miscellaneous (
        institution_id, vision, mission, core_values,
        college_anthem, notable_alumni, social_media_links
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionId,
        'To be a globally recognized institution of excellence in engineering education, research, and innovation.',
        'To provide quality education, foster innovation, and develop professionals who contribute to society.',
        'Excellence, Integrity, Innovation, Social Responsibility',
        'Sahyadri Anthem - Celebrating Excellence in Education',
        'Notable alumni include industry leaders, researchers, and entrepreneurs',
        'Facebook: @sahyadricollege, Twitter: @sahyadri_edu, LinkedIn: Sahyadri College'
      ]
    );

    await connection.commit();
    console.log('✅ Institution data seeded successfully!');
    console.log(`   Institution ID: ${institutionId}`);
    
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error('❌ Error seeding institution data:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Run the seed
seedInstitutionData();

