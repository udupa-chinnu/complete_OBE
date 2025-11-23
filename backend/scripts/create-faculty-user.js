const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createFacultyUser = async () => {
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

    // First, check if there's a faculty in the database
    const [faculties] = await connection.execute(
      'SELECT id FROM faculties WHERE is_active = TRUE LIMIT 1'
    );

    if (faculties.length === 0) {
      console.log('❌ No active faculty found in database. Please add a faculty first.');
      return;
    }

    const facultyId = faculties[0].id;

    const username = 'faculty';
    const email = 'rajesh.ise@sahyadri.edu.in';
    const password = 'faculty123';
    const userType = 'faculty';

    // Check if user already exists
    const [existing] = await connection.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      console.log('❌ Faculty user already exists with this username or email.');
      console.log('   Updating password and linking to faculty...');
      
      // Update existing user
      const passwordHash = await bcrypt.hash(password, 10);
      await connection.execute(
        'UPDATE users SET password_hash = ?, faculty_id = ? WHERE id = ?',
        [passwordHash, facultyId, existing[0].id]
      );

      // Ensure faculty role exists
      const [facultyRole] = await connection.execute(
        'SELECT id FROM user_roles WHERE user_id = ? AND role = ?',
        [existing[0].id, 'faculty']
      );

      if (facultyRole.length === 0) {
        await connection.execute(
          'INSERT INTO user_roles (user_id, role) VALUES (?, ?)',
          [existing[0].id, 'faculty']
        );
      }

      console.log(`✅ Faculty user updated successfully!`);
      console.log(`   Username: ${username}`);
      console.log(`   Email: ${email}`);
      console.log(`   Password: ${password}`);
      console.log(`   User Type: ${userType}`);
      console.log(`   Faculty ID: ${facultyId}`);
      console.log(`   Redirects to: /dashboard (for role selection)`);
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await connection.execute(
      `INSERT INTO users (username, email, password_hash, user_type, faculty_id, is_active) 
       VALUES (?, ?, ?, ?, ?, TRUE)`,
      [username, email, passwordHash, userType, facultyId]
    );

    const userId = result.insertId;

    // Automatically assign "faculty" role
    await connection.execute(
      'INSERT INTO user_roles (user_id, role) VALUES (?, ?)',
      [userId, 'faculty']
    );

    console.log(`✅ Faculty user created successfully with ID: ${userId}`);
    console.log(`   Username: ${username}`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   User Type: ${userType}`);
    console.log(`   Faculty ID: ${facultyId}`);
    console.log(`   Redirects to: /dashboard (for role selection)`);
    console.log(`   Note: Faculty role is assigned by default. HOD role can be assigned separately.`);

  } catch (error) {
    console.error('❌ Error creating faculty user:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Connection closed.');
    }
  }
};

createFacultyUser();

