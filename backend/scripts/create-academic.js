const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createAcademicUser = async () => {
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

    const username = 'academic';
    const email = 'academic@test.com';
    const password = 'academic123';
    const userType = 'academic';

    // Check if user already exists
    const [existing] = await connection.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      console.log('❌ Academic user already exists with this username or email.');
      return;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await connection.execute(
      `INSERT INTO users (username, email, password_hash, user_type, is_active) 
       VALUES (?, ?, ?, ?, TRUE)`,
      [username, email, passwordHash, userType]
    );

    console.log(`✅ Academic user created successfully with ID: ${result.insertId}`);
    console.log(`   Username: ${username}`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   User Type: ${userType}`);
    console.log(`   Redirects to: /academicSWO/dashboard`);

  } catch (error) {
    console.error('❌ Error creating academic user:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Connection closed.');
    }
  }
};

createAcademicUser();

