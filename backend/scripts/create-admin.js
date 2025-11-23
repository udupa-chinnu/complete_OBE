// Script to create admin user with properly hashed password
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAdmin() {
  let connection;
  
  try {
    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'education_portal',
      port: process.env.DB_PORT || 3306,
    });

    const username = 'admin';
    const email = 'admin@test.com';
    const password = 'test123';
    const userType = 'admin';

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log('Password hash:', passwordHash);

    // Check if user already exists
    const [existing] = await connection.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      // Update existing user
      await connection.execute(
        'UPDATE users SET password_hash = ? WHERE username = ? OR email = ?',
        [passwordHash, username, email]
      );
      console.log('✅ Admin user password updated successfully!');
    } else {
      // Create new user
      const [result] = await connection.execute(
        'INSERT INTO users (username, email, password_hash, user_type) VALUES (?, ?, ?, ?)',
        [username, email, passwordHash, userType]
      );
      console.log('✅ Admin user created successfully!');
      console.log('User ID:', result.insertId);
    }

    console.log('\n📝 Login Credentials:');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('User Type:', userType);

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createAdmin();

