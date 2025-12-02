const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// POST login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Check if username ends with @sahyadri.edu.in (faculty login)
    if (username.includes('@sahyadri.edu.in') || username.includes('sahyadri.edu.in')) {
      // Try to fetch from faculties table
      const [faculties] = await pool.execute(
        'SELECT id, faculty_id, official_email, password_hash, first_name, last_name FROM faculties WHERE official_email = ? AND is_active = TRUE',
        [username]
      );

      if (faculties.length > 0) {
        const faculty = faculties[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(password, faculty.password_hash);
        if (!isValidPassword) {
          return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Generate JWT token for faculty
        const token = jwt.sign(
          { 
            userId: faculty.id, 
            username: faculty.official_email, 
            userType: 'faculty',
            facultyId: faculty.id,
            name: `${faculty.first_name} ${faculty.last_name}`
          },
          process.env.JWT_SECRET || 'your-secret-key-change-in-production',
          { expiresIn: '24h' }
        );

        return res.json({
          success: true,
          message: 'Login successful',
          token,
          user: {
            id: faculty.id,
            username: faculty.official_email,
            userType: 'faculty',
            name: `${faculty.first_name} ${faculty.last_name}`,
            roles: ['faculty']
          }
        });
      }
    }

    // Fall back to users table for other authentication
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE (username = ? OR email = ?) AND is_active = TRUE',
      [username, username]
    );

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Get user roles from user_roles table
    let [roles] = await pool.execute(
      `SELECT ur.role, ur.department_id, d.name as department_name 
       FROM user_roles ur 
       LEFT JOIN departments d ON ur.department_id = d.id 
       WHERE ur.user_id = ? AND ur.is_active = TRUE`,
      [user.id]
    );
    
    // Also check if user is HOD via departments table (for backward compatibility)
    if (user.user_type === 'faculty' && user.faculty_id) {
      const [hodDepartments] = await pool.execute(
        `SELECT id, name FROM departments WHERE hod_faculty_id = ? AND is_active = TRUE`,
        [user.faculty_id]
      );
      
      // Add HOD roles from departments table if not already in user_roles
      for (const dept of hodDepartments) {
        const hasHodRole = roles.some(r => r.role === 'hod' && r.department_id === dept.id);
        if (!hasHodRole) {
          roles.push({
            role: 'hod',
            department_id: dept.id,
            department_name: dept.name
          });
          
          // Auto-create the role in user_roles table for future consistency
          try {
            const [existingRole] = await pool.execute(
              'SELECT id FROM user_roles WHERE user_id = ? AND role = ? AND department_id = ?',
              [user.id, 'hod', dept.id]
            );
            if (existingRole.length === 0) {
              // Ensure faculty role exists first
              const [facultyRole] = await pool.execute(
                'SELECT id FROM user_roles WHERE user_id = ? AND role = ?',
                [user.id, 'faculty']
              );
              if (facultyRole.length === 0) {
                await pool.execute('INSERT INTO user_roles (user_id, role) VALUES (?, ?)', [user.id, 'faculty']);
              }
              
              await pool.execute(
                'INSERT INTO user_roles (user_id, role, department_id) VALUES (?, ?, ?)',
                [user.id, 'hod', dept.id]
              );
            }
          } catch (syncError) {
            // Log but don't fail login
            console.warn('Error syncing HOD role to user_roles:', syncError);
          }
        }
      }
    }

    // Update last login
    await pool.execute('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username, userType: user.user_type },
      process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      { expiresIn: '24h' }
    );

    // Get faculty info if user is faculty
    let facultyInfo = null;
    if (user.user_type === 'faculty' && user.faculty_id) {
      const [faculties] = await pool.execute(
        `SELECT 
          f.id, 
          f.faculty_id, 
          f.first_name, 
          f.last_name, 
          f.designation,
          fe.parent_department
         FROM faculties f
         LEFT JOIN faculty_employment fe ON f.id = fe.faculty_id
         WHERE f.id = ?`,
        [user.faculty_id]
      );
      if (faculties.length > 0) {
        facultyInfo = faculties[0];
      }
    }

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          userType: user.user_type,
          roles: roles.map(r => ({
            role: r.role,
            departmentId: r.department_id,
            departmentName: r.department_name
          })),
          facultyInfo
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
});

// POST verify token
router.post('/verify', authenticateToken, async (req, res) => {
  try {
    // Get user roles from user_roles table
    let [roles] = await pool.execute(
      `SELECT ur.role, ur.department_id, d.name as department_name 
       FROM user_roles ur 
       LEFT JOIN departments d ON ur.department_id = d.id 
       WHERE ur.user_id = ? AND ur.is_active = TRUE`,
      [req.user.id]
    );
    
    // Also check if user is HOD via departments table (for backward compatibility)
    if (req.user.user_type === 'faculty') {
      const [users] = await pool.execute('SELECT faculty_id FROM users WHERE id = ?', [req.user.id]);
      if (users[0]?.faculty_id) {
        const [hodDepartments] = await pool.execute(
          `SELECT id, name FROM departments WHERE hod_faculty_id = ? AND is_active = TRUE`,
          [users[0].faculty_id]
        );
        
        // Add HOD roles from departments table if not already in user_roles
        for (const dept of hodDepartments) {
          const hasHodRole = roles.some(r => r.role === 'hod' && r.department_id === dept.id);
          if (!hasHodRole) {
            roles.push({
              role: 'hod',
              department_id: dept.id,
              department_name: dept.name
            });
          }
        }
      }
    }

    // Get faculty info if user is faculty
    let facultyInfo = null;
    if (req.user.user_type === 'faculty') {
      const [users] = await pool.execute('SELECT faculty_id FROM users WHERE id = ?', [req.user.id]);
      if (users[0]?.faculty_id) {
        const [faculties] = await pool.execute(
          `SELECT 
            f.id, 
            f.faculty_id, 
            f.first_name, 
            f.last_name, 
            f.designation,
            fe.parent_department
           FROM faculties f
           LEFT JOIN faculty_employment fe ON f.id = fe.faculty_id
           WHERE f.id = ?`,
          [users[0].faculty_id]
        );
        if (faculties.length > 0) {
          facultyInfo = faculties[0];
        }
      }
    }

    res.json({
      success: true,
      data: {
        user: {
          id: req.user.id,
          username: req.user.username,
          email: req.user.email,
          userType: req.user.user_type,
          roles: roles.map(r => ({
            role: r.role,
            departmentId: r.department_id,
            departmentName: r.department_name
          })),
          facultyInfo
        }
      }
    });
  } catch (error) {
    console.error('Verify token error:', error);
    res.status(500).json({ success: false, message: 'Token verification failed', error: error.message });
  }
});

// POST logout (properly handle logout)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Optionally, you can track logout in database or invalidate token
    // For now, we just return success - token invalidation is handled client-side
    // In a production system, you might want to maintain a blacklist of tokens
    
    res.json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Logout failed', error: error.message });
  }
});

// POST logout (without authentication - for cases where token might be invalid)
router.post('/logout-no-auth', async (req, res) => {
  try {
    // Allow logout even if token is invalid/expired
    res.json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ success: false, message: 'Logout failed', error: error.message });
  }
});

// POST create user (for admin to create users)
router.post('/create-user', authenticateToken, async (req, res) => {
  try {
    // Only admin can create users
    if (req.user.user_type !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admin can create users' });
    }

    const { username, email, password, userType, facultyId, studentId } = req.body;

    if (!username || !email || !password || !userType) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }

    // Check if username or email already exists
    const [existing] = await pool.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Username or email already exists' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await pool.execute(
      `INSERT INTO users (username, email, password_hash, user_type, faculty_id, student_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, email, passwordHash, userType, facultyId || null, studentId || null]
    );

    const userId = result.insertId;

    // Automatically assign "faculty" role if user type is faculty
    if (userType === 'faculty') {
      await pool.execute(
        'INSERT INTO user_roles (user_id, role) VALUES (?, ?)',
        [userId, 'faculty']
      );
    }

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { userId }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ success: false, message: 'Failed to create user', error: error.message });
  }
});

// POST assign role to faculty (for HOD role)
router.post('/assign-role', authenticateToken, async (req, res) => {
  try {
    // Only admin can assign roles
    if (req.user.user_type !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admin can assign roles' });
    }

    const { userId, role, departmentId } = req.body;

    if (!userId || !role) {
      return res.status(400).json({ success: false, message: 'User ID and role are required' });
    }

    // Check if user exists and is faculty
    const [users] = await pool.execute('SELECT user_type FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (users[0].user_type !== 'faculty') {
      return res.status(400).json({ success: false, message: 'Roles can only be assigned to faculty users' });
    }

    // Check if role already exists
    const [existing] = await pool.execute(
      'SELECT id FROM user_roles WHERE user_id = ? AND role = ? AND (department_id = ? OR (department_id IS NULL AND ? IS NULL))',
      [userId, role, departmentId || null, departmentId || null]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Role already assigned' });
    }

    // Assign role (faculty role is default, so we only need to add HOD if needed)
    if (role === 'hod') {
      // First ensure faculty role exists
      const [facultyRole] = await pool.execute(
        'SELECT id FROM user_roles WHERE user_id = ? AND role = ?',
        [userId, 'faculty']
      );

      if (facultyRole.length === 0) {
        await pool.execute('INSERT INTO user_roles (user_id, role) VALUES (?, ?)', [userId, 'faculty']);
      }

      // Add HOD role
      await pool.execute(
        'INSERT INTO user_roles (user_id, role, department_id) VALUES (?, ?, ?)',
        [userId, 'hod', departmentId || null]
      );
    } else if (role === 'faculty') {
      // Ensure faculty role exists
      const [facultyRole] = await pool.execute(
        'SELECT id FROM user_roles WHERE user_id = ? AND role = ?',
        [userId, 'faculty']
      );

      if (facultyRole.length === 0) {
        await pool.execute('INSERT INTO user_roles (user_id, role) VALUES (?, ?)', [userId, 'faculty']);
      }
    }

    res.json({ success: true, message: 'Role assigned successfully' });
  } catch (error) {
    console.error('Assign role error:', error);
    res.status(500).json({ success: false, message: 'Failed to assign role', error: error.message });
  }
});

// GET user roles
router.get('/roles/:userId', authenticateToken, async (req, res) => {
  try {
    const { userId } = req.params;

    // Users can only view their own roles, or admin can view any
    if (req.user.id !== parseInt(userId) && req.user.user_type !== 'admin') {
      return res.status(403).json({ success: false, message: 'Insufficient permissions' });
    }

    const [roles] = await pool.execute(
      `SELECT ur.*, d.name as department_name 
       FROM user_roles ur 
       LEFT JOIN departments d ON ur.department_id = d.id 
       WHERE ur.user_id = ? AND ur.is_active = TRUE`,
      [userId]
    );

    res.json({ success: true, data: roles });
  } catch (error) {
    console.error('Get roles error:', error);
    res.status(500).json({ success: false, message: 'Failed to get roles', error: error.message });
  }
});

module.exports = router;

