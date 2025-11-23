const mysql = require('mysql2/promise');
require('dotenv').config();

const seedInstitutionData = async () => {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'sqlchinnu123',
      database: process.env.DB_NAME || 'education_portal',
    });

    console.log('Connected to database successfully.');

    // ---------------------------------------------------------
    // 1. Seed Faculty (Parent Table)
    // ---------------------------------------------------------
    const facultyQuery = `
      INSERT INTO faculties (
        faculty_id, title, first_name, middle_name, last_name, 
        call_name, initials, designation, date_of_birth, gender, 
        permanent_address, current_address, city, state, pincode, 
        residence_number, personal_email, official_email, nationality, 
        blood_group, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const facultyValues = [
      'FAC003',             // faculty_id
      'Mr',                      // title
      'Ravi',                   // first_name
      '',                    // middle_name
      'Patel',                   // last_name
      '',                      // call_name
      '',                    // initials
      'Assistant Professor',      // designation
      '1999-06-15',               // date_of_birth
      'Male',                     // gender
      '123, Gandhi Nagar, Main Rd', // permanent_address
      '456, Staff Quarters, Block A', // current_address
      'Bangalore',                // city
      'Karnataka',                // state
      '560001',                   // pincode
      '080-22334455',             // residence_number
      'ravi.patel@gmail.com',  // personal_email
      'ravi.ise@sahyadri.edu.in', // official_email
      'Indian',                   // nationality
      'O+',                       // blood_group
      true                        // is_active
    ];

    const [facultyResult] = await connection.execute(facultyQuery, facultyValues);
    const newFacultyId = facultyResult.insertId;
    console.log(`✅ Seeded Faculty with ID: ${newFacultyId}`);

    // ---------------------------------------------------------
    // 2. Seed Faculty Employment (Child Table)
    // ---------------------------------------------------------
    const employmentQuery = `
      INSERT INTO faculty_employment (
        faculty_id, appointment_letter_number, appointment_date, 
        parent_department, joining_date, designation_date, 
        associate_type, currently_associated, appointed_to, 
        academic_experience, research_experience, industry_experience
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const employmentValues = [
      newFacultyId,               // faculty_id (Foreign Key)
      'APT/2015/IS/044',          // appointment_letter_number
      '2015-08-01',               // appointment_date
      'Information Science',         // parent_department
      '2015-08-10',               // joining_date
      '2020-06-01',               // designation_date (e.g. date of promotion)
      'Regular',                  // associate_type
      'Yes',                      // currently_associated
      'Information Science & Engineering', // appointed_to
      4.0,                        // academic_experience (years)
      4.0,                        // research_experience (years)
      2.0                         // industry_experience (years)
    ];

    await connection.execute(employmentQuery, employmentValues);
    console.log(`✅ Seeded Employment details for Faculty ID: ${newFacultyId}`);

    // ---------------------------------------------------------
    // 3. Seed Faculty Qualifications (Child Table)
    // ---------------------------------------------------------
    const qualificationQuery = `
      INSERT INTO faculty_qualifications (
        faculty_id, qualification_type, degree, specialization, 
        university, year_of_completion, percentage_cgpa, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const qualificationValues = [
      1,               // faculty_id (Foreign Key)
      'PG',                      // qualification_type
      'Masters',     // degree
      'Machine Learning',         // specialization
      'Visvesvaraya Technological University', // university
      2015,                       // year_of_completion
      9.0,                       // percentage_cgpa (often NA for PhD)
      true                        // is_active
    ];

    await connection.execute(qualificationQuery, qualificationValues);
    console.log(`✅ Seeded Qualification details for Faculty ID: 1`);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Connection closed.');
    }
  }
};

seedInstitutionData();