const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/programs');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'program-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Allowed: PDF, DOC, DOCX, JPG, PNG'));
  }
});

// Handle multiple files
const uploadFields = upload.fields([
  { name: 'aicteApprovalDoc', maxCount: 1 },
  { name: 'intakeChangeDoc', maxCount: 1 },
  { name: 'accreditationFile', maxCount: 1 }
]);

// GET all programs (active only by default)
router.get('/', async (req, res) => {
  try {
    const { includeInactive, departmentId } = req.query;
    let query = `
      SELECT 
        p.*,
        d.name as department_name,
        d.code as department_code
      FROM programs p
      LEFT JOIN departments d ON p.department_id = d.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (includeInactive !== 'true') {
      query += ' AND p.is_active = TRUE';
    }
    
    if (departmentId) {
      query += ' AND p.department_id = ?';
      params.push(departmentId);
    }
    
    query += ' ORDER BY p.name';
    
    const [programs] = await pool.execute(query, params);
    
    res.json({ success: true, data: programs });
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ success: false, message: 'Error fetching programs', error: error.message });
  }
});

// GET single program by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [programs] = await pool.execute(
      `SELECT 
        p.*,
        d.name as department_name,
        d.code as department_code
      FROM programs p
      LEFT JOIN departments d ON p.department_id = d.id
      WHERE p.id = ?`,
      [id]
    );
    
    if (programs.length === 0) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    
    res.json({ success: true, data: programs[0] });
  } catch (error) {
    console.error('Error fetching program:', error);
    res.status(500).json({ success: false, message: 'Error fetching program', error: error.message });
  }
});

// POST create new program
router.post('/', uploadFields, async (req, res) => {
  try {
    const {
      level,
      type,
      otherType,
      name,
      code,
      departmentId,
      parentalDepartment,
      sanctionedIntake,
      commencementYear,
      aicteApprovalYear,
      intakeChanged,
      newIntake,
      accreditationStatus,
      duration,
      totalCredits
    } = req.body;
    
    // Validate required fields
    if (!level || !type || !name || !code || !departmentId || !sanctionedIntake || !duration) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }
    
    // Check if code already exists
    const [existing] = await pool.execute('SELECT id FROM programs WHERE code = ?', [code]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Program code already exists' });
    }
    
    // Handle file paths
    const aicteApprovalDocPath = req.files?.aicteApprovalDoc?.[0] 
      ? `/uploads/programs/${req.files.aicteApprovalDoc[0].filename}` 
      : null;
    const intakeChangeDocPath = req.files?.intakeChangeDoc?.[0] 
      ? `/uploads/programs/${req.files.intakeChangeDoc[0].filename}` 
      : null;
    const accreditationFilePath = req.files?.accreditationFile?.[0] 
      ? `/uploads/programs/${req.files.accreditationFile[0].filename}` 
      : null;
    
    const [result] = await pool.execute(
      `INSERT INTO programs (
        level, type, other_type, name, code, department_id, parental_department,
        sanctioned_intake, commencement_year, aicte_approval_year, aicte_approval_doc_path,
        intake_changed, new_intake, intake_change_doc_path,
        accreditation_status, accreditation_file_path, duration, total_credits
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        level,
        type,
        otherType || null,
        name,
        code,
        departmentId,
        parentalDepartment || null,
        sanctionedIntake,
        commencementYear || null,
        aicteApprovalYear || null,
        aicteApprovalDocPath,
        intakeChanged === 'Yes' ? 'Yes' : 'No',
        intakeChanged === 'Yes' ? newIntake : null,
        intakeChangeDocPath,
        accreditationStatus || null,
        accreditationFilePath,
        duration,
        totalCredits || null
      ]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Program created successfully', 
      data: { id: result.insertId } 
    });
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(500).json({ success: false, message: 'Error creating program', error: error.message });
  }
});

// PUT update program
router.put('/:id', uploadFields, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      level,
      type,
      otherType,
      name,
      code,
      departmentId,
      parentalDepartment,
      sanctionedIntake,
      commencementYear,
      aicteApprovalYear,
      intakeChanged,
      newIntake,
      accreditationStatus,
      duration,
      totalCredits
    } = req.body;
    
    // Check if program exists
    const [existing] = await pool.execute('SELECT * FROM programs WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    
    // Check if code already exists (excluding current program)
    if (code) {
      const [codeCheck] = await pool.execute('SELECT id FROM programs WHERE code = ? AND id != ?', [code, id]);
      if (codeCheck.length > 0) {
        return res.status(400).json({ success: false, message: 'Program code already exists' });
      }
    }
    
    // Handle file paths - keep existing if no new file uploaded
    let aicteApprovalDocPath = existing[0].aicte_approval_doc_path;
    let intakeChangeDocPath = existing[0].intake_change_doc_path;
    let accreditationFilePath = existing[0].accreditation_file_path;
    
    if (req.files?.aicteApprovalDoc?.[0]) {
      // Delete old file
      if (aicteApprovalDocPath) {
        const oldPath = path.join(__dirname, '..', aicteApprovalDocPath);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      aicteApprovalDocPath = `/uploads/programs/${req.files.aicteApprovalDoc[0].filename}`;
    }
    
    if (req.files?.intakeChangeDoc?.[0]) {
      if (intakeChangeDocPath) {
        const oldPath = path.join(__dirname, '..', intakeChangeDocPath);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      intakeChangeDocPath = `/uploads/programs/${req.files.intakeChangeDoc[0].filename}`;
    }
    
    if (req.files?.accreditationFile?.[0]) {
      if (accreditationFilePath) {
        const oldPath = path.join(__dirname, '..', accreditationFilePath);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      accreditationFilePath = `/uploads/programs/${req.files.accreditationFile[0].filename}`;
    }
    
    await pool.execute(
      `UPDATE programs SET
        level = ?, type = ?, other_type = ?, name = ?, code = ?, department_id = ?,
        parental_department = ?, sanctioned_intake = ?, commencement_year = ?,
        aicte_approval_year = ?, aicte_approval_doc_path = ?, intake_changed = ?,
        new_intake = ?, intake_change_doc_path = ?, accreditation_status = ?,
        accreditation_file_path = ?, duration = ?, total_credits = ?
      WHERE id = ?`,
      [
        level, type, otherType || null, name, code, departmentId,
        parentalDepartment || null, sanctionedIntake, commencementYear || null,
        aicteApprovalYear || null, aicteApprovalDocPath, intakeChanged === 'Yes' ? 'Yes' : 'No',
        intakeChanged === 'Yes' ? newIntake : null, intakeChangeDocPath,
        accreditationStatus || null, accreditationFilePath, duration, totalCredits || null, id
      ]
    );
    
    res.json({ success: true, message: 'Program updated successfully' });
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(500).json({ success: false, message: 'Error updating program', error: error.message });
  }
});

// DELETE (deactivate) program
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('UPDATE programs SET is_active = FALSE WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Program deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating program:', error);
    res.status(500).json({ success: false, message: 'Error deactivating program', error: error.message });
  }
});

// POST reactivate program
router.post('/:id/reactivate', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('UPDATE programs SET is_active = TRUE WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Program reactivated successfully' });
  } catch (error) {
    console.error('Error reactivating program:', error);
    res.status(500).json({ success: false, message: 'Error reactivating program', error: error.message });
  }
});

module.exports = router;

