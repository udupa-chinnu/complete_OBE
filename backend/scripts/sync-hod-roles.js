const mysql = require('mysql2/promise');
require('dotenv').config();

const syncHodRoles = async () => {
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

    // Get all departments with HOD assignments
    const [departments] = await connection.execute(
      'SELECT id, name, hod_faculty_id FROM departments WHERE hod_faculty_id IS NOT NULL AND is_active = TRUE'
    );

    console.log(`Found ${departments.length} departments with HOD assignments.`);

    for (const dept of departments) {
      // Get user_id for the HOD faculty
      const [users] = await connection.execute(
        'SELECT id FROM users WHERE faculty_id = ?',
        [dept.hod_faculty_id]
      );

      if (users.length === 0) {
        console.log(`⚠️  No user found for faculty_id ${dept.hod_faculty_id} (Department: ${dept.name})`);
        continue;
      }

      const userId = users[0].id;

      // Ensure faculty role exists
      const [facultyRole] = await connection.execute(
        'SELECT id FROM user_roles WHERE user_id = ? AND role = ?',
        [userId, 'faculty']
      );
      
      if (facultyRole.length === 0) {
        await connection.execute(
          'INSERT INTO user_roles (user_id, role) VALUES (?, ?)',
          [userId, 'faculty']
        );
        console.log(`✅ Created faculty role for user_id ${userId}`);
      }

      // Check if HOD role already exists
      const [existingHodRole] = await connection.execute(
        'SELECT id FROM user_roles WHERE user_id = ? AND role = ? AND department_id = ?',
        [userId, 'hod', dept.id]
      );

      if (existingHodRole.length === 0) {
        await connection.execute(
          'INSERT INTO user_roles (user_id, role, department_id) VALUES (?, ?, ?)',
          [userId, 'hod', dept.id]
        );
        console.log(`✅ Created HOD role for user_id ${userId} in department "${dept.name}" (ID: ${dept.id})`);
      } else {
        console.log(`ℹ️  HOD role already exists for user_id ${userId} in department "${dept.name}"`);
      }
    }

    console.log('\n✅ HOD role synchronization completed!');

  } catch (error) {
    console.error('❌ Error syncing HOD roles:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('Connection closed.');
    }
  }
};

syncHodRoles();

