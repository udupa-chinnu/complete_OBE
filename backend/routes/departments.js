const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// GET all departments (active only by default)
router.get('/', async (req, res) => {
  try {
    const { includeInactive } = req.query;
    let query = `
      SELECT 
        d.*,
        f.id as hod_id,
        f.faculty_id as hod_faculty_id,
        CONCAT(COALESCE(f.title, ''), ' ', f.first_name, ' ', COALESCE(f.middle_name, ''), ' ', f.last_name) as hod_name,
        f.designation as hod_designation
      FROM departments d
      LEFT JOIN faculties f ON d.hod_faculty_id = f.id
    `;
    
    if (includeInactive !== 'true') {
      query += ' WHERE d.is_active = TRUE';
    }
    
    query += ' ORDER BY d.name';
    
    const [departments] = await pool.execute(query);
    
    res.json({ success: true, data: departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ success: false, message: 'Error fetching departments', error: error.message });
  }
});

// GET single department by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [departments] = await pool.execute(
      `SELECT 
        d.*,
        f.id as hod_id,
        f.faculty_id as hod_faculty_id,
        CONCAT(COALESCE(f.title, ''), ' ', f.first_name, ' ', COALESCE(f.middle_name, ''), ' ', f.last_name) as hod_name,
        f.designation as hod_designation,
        f.official_email as hod_email,
        f.residence_number as hod_phone
      FROM departments d
      LEFT JOIN faculties f ON d.hod_faculty_id = f.id
      WHERE d.id = ?`,
      [id]
    );
    
    if (departments.length === 0) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    
    res.json({ success: true, data: departments[0] });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({ success: false, message: 'Error fetching department', error: error.message });
  }
});

// POST create new department
router.post('/', async (req, res) => {
  try {
    const {
      name,
      code,
      hodFacultyId,
      establishmentYear,
      contactEmail,
      contactPhone,
      website
    } = req.body;
    
    // Validate required fields
    if (!name || !code) {
      return res.status(400).json({ success: false, message: 'Name and code are required' });
    }
    
    // Check if code already exists
    const [existing] = await pool.execute('SELECT id FROM departments WHERE code = ?', [code]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Department code already exists' });
    }
    
    const [result] = await pool.execute(
      `INSERT INTO departments (
        name, code, hod_faculty_id, establishment_year, contact_email, contact_phone, website
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        code,
        hodFacultyId || null,
        establishmentYear || null,
        contactEmail || null,
        contactPhone || null,
        website || null
      ]
    );
    
    const departmentId = result.insertId;
    
    // Auto-create HOD role in user_roles if HOD is assigned
    if (hodFacultyId) {
      // Get user_id for HOD
      const [hodUser] = await pool.execute('SELECT id FROM users WHERE faculty_id = ?', [hodFacultyId]);
      if (hodUser.length > 0) {
        const userId = hodUser[0].id;
        
        // Ensure faculty role exists
        const [facultyRole] = await pool.execute(
          'SELECT id FROM user_roles WHERE user_id = ? AND role = ?',
          [userId, 'faculty']
        );
        if (facultyRole.length === 0) {
          await pool.execute('INSERT INTO user_roles (user_id, role) VALUES (?, ?)', [userId, 'faculty']);
        }
        
        // Add HOD role for this department
        await pool.execute(
          'INSERT INTO user_roles (user_id, role, department_id) VALUES (?, ?, ?)',
          [userId, 'hod', departmentId]
        );
      }
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Department created successfully', 
      data: { id: departmentId } 
    });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ success: false, message: 'Error creating department', error: error.message });
  }
});

// PUT update department
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      code,
      hodFacultyId,
      establishmentYear,
      contactEmail,
      contactPhone,
      website
    } = req.body;
    
    // Check if department exists
    const [existing] = await pool.execute('SELECT id FROM departments WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Department not found' });
    }
    
    // Check if code already exists (excluding current department)
    if (code) {
      const [codeCheck] = await pool.execute('SELECT id FROM departments WHERE code = ? AND id != ?', [code, id]);
      if (codeCheck.length > 0) {
        return res.status(400).json({ success: false, message: 'Department code already exists' });
      }
    }
    
    // Get old HOD before update
    const [oldDept] = await pool.execute('SELECT hod_faculty_id FROM departments WHERE id = ?', [id]);
    const oldHodFacultyId = oldDept[0]?.hod_faculty_id;
    
    await pool.execute(
      `UPDATE departments SET
        name = ?,
        code = ?,
        hod_faculty_id = ?,
        establishment_year = ?,
        contact_email = ?,
        contact_phone = ?,
        website = ?
      WHERE id = ?`,
      [
        name,
        code,
        hodFacultyId || null,
        establishmentYear || null,
        contactEmail || null,
        contactPhone || null,
        website || null,
        id
      ]
    );
    
    // Update user_roles based on HOD assignment
    // Remove HOD role from old HOD if changed
    if (oldHodFacultyId && oldHodFacultyId !== hodFacultyId) {
      // Get user_id for old HOD
      const [oldUser] = await pool.execute('SELECT id FROM users WHERE faculty_id = ?', [oldHodFacultyId]);
      if (oldUser.length > 0) {
        // Remove HOD role for this department
        await pool.execute(
          'DELETE FROM user_roles WHERE user_id = ? AND role = ? AND department_id = ?',
          [oldUser[0].id, 'hod', id]
        );
      }
    }
    
    // Add HOD role to new HOD if assigned
    if (hodFacultyId) {
      // Get user_id for new HOD
      const [newUser] = await pool.execute('SELECT id FROM users WHERE faculty_id = ?', [hodFacultyId]);
      if (newUser.length > 0) {
        const userId = newUser[0].id;
        
        // Ensure faculty role exists
        const [facultyRole] = await pool.execute(
          'SELECT id FROM user_roles WHERE user_id = ? AND role = ?',
          [userId, 'faculty']
        );
        if (facultyRole.length === 0) {
          await pool.execute('INSERT INTO user_roles (user_id, role) VALUES (?, ?)', [userId, 'faculty']);
        }
        
        // Add HOD role for this department
        const [existingHodRole] = await pool.execute(
          'SELECT id FROM user_roles WHERE user_id = ? AND role = ? AND department_id = ?',
          [userId, 'hod', id]
        );
        if (existingHodRole.length === 0) {
          await pool.execute(
            'INSERT INTO user_roles (user_id, role, department_id) VALUES (?, ?, ?)',
            [userId, 'hod', id]
          );
        }
      }
    }
    
    res.json({ success: true, message: 'Department updated successfully' });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({ success: false, message: 'Error updating department', error: error.message });
  }
});

// DELETE (deactivate) department
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if department has active programs
    const [programs] = await pool.execute(
      'SELECT COUNT(*) as count FROM programs WHERE department_id = ? AND is_active = TRUE',
      [id]
    );
    
    if (programs[0].count > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot deactivate department with active programs. Please deactivate programs first.' 
      });
    }
    
    await pool.execute('UPDATE departments SET is_active = FALSE WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Department deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating department:', error);
    res.status(500).json({ success: false, message: 'Error deactivating department', error: error.message });
  }
});

// POST reactivate department
router.post('/:id/reactivate', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('UPDATE departments SET is_active = TRUE WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Department reactivated successfully' });
  } catch (error) {
    console.error('Error reactivating department:', error);
    res.status(500).json({ success: false, message: 'Error reactivating department', error: error.message });
  }
});

module.exports = router;

