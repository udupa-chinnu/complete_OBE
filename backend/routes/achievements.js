const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/achievements');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'achievement-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|jpg|jpeg|png|mp4|avi|mov/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type'));
  }
});

const uploadFields = upload.fields([
  { name: 'supportingDocument', maxCount: 1 },
  { name: 'media', maxCount: 1 }
]);

// GET all achievements (active only by default)
router.get('/', async (req, res) => {
  try {
    const { includeInactive, category, departmentId, level } = req.query;
    let query = `
      SELECT 
        a.*,
        d.name as department_name,
        d.code as department_code
      FROM achievements a
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (includeInactive !== 'true') {
      query += ' AND a.is_active = TRUE';
    }
    
    if (category) {
      query += ' AND a.category = ?';
      params.push(category);
    }
    
    if (departmentId) {
      query += ' AND a.department_id = ?';
      params.push(departmentId);
    }
    
    if (level) {
      query += ' AND a.level = ?';
      params.push(level);
    }
    
    query += ' ORDER BY a.date DESC, a.created_at DESC';
    
    const [achievements] = await pool.execute(query, params);
    
    res.json({ success: true, data: achievements });
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ success: false, message: 'Error fetching achievements', error: error.message });
  }
});

// GET single achievement by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [achievements] = await pool.execute(
      `SELECT 
        a.*,
        d.name as department_name,
        d.code as department_code
      FROM achievements a
      LEFT JOIN departments d ON a.department_id = d.id
      WHERE a.id = ?`,
      [id]
    );
    
    if (achievements.length === 0) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    
    res.json({ success: true, data: achievements[0] });
  } catch (error) {
    console.error('Error fetching achievement:', error);
    res.status(500).json({ success: false, message: 'Error fetching achievement', error: error.message });
  }
});

// POST create new achievement
router.post('/', uploadFields, async (req, res) => {
  try {
    const {
      title,
      category,
      date,
      academicYear,
      description,
      departmentId,
      level,
      uploadedBy,
      verifiedStatus
    } = req.body;
    
    // Validate required fields
    if (!title || !category || !date || !academicYear || !description || !level) {
      return res.status(400).json({ success: false, message: 'Required fields are missing' });
    }
    
    // Handle file paths
    const supportingDocPath = req.files?.supportingDocument?.[0] 
      ? `/uploads/achievements/${req.files.supportingDocument[0].filename}` 
      : null;
    const mediaPath = req.files?.media?.[0] 
      ? `/uploads/achievements/${req.files.media[0].filename}` 
      : null;
    
    const [result] = await pool.execute(
      `INSERT INTO achievements (
        title, category, date, academic_year, description, department_id,
        level, uploaded_by, verified_status, supporting_document_path, media_path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        category,
        date,
        academicYear,
        description,
        departmentId || null,
        level,
        uploadedBy || 'Admin',
        verifiedStatus || 'Pending',
        supportingDocPath,
        mediaPath
      ]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Achievement created successfully', 
      data: { id: result.insertId } 
    });
  } catch (error) {
    console.error('Error creating achievement:', error);
    res.status(500).json({ success: false, message: 'Error creating achievement', error: error.message });
  }
});

// PUT update achievement
router.put('/:id', uploadFields, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      category,
      date,
      academicYear,
      description,
      departmentId,
      level,
      uploadedBy,
      verifiedStatus
    } = req.body;
    
    // Check if achievement exists
    const [existing] = await pool.execute('SELECT * FROM achievements WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Achievement not found' });
    }
    
    // Handle file paths - keep existing if no new file uploaded
    let supportingDocPath = existing[0].supporting_document_path;
    let mediaPath = existing[0].media_path;
    
    if (req.files?.supportingDocument?.[0]) {
      // Delete old file
      if (supportingDocPath) {
        const oldPath = path.join(__dirname, '..', supportingDocPath);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      supportingDocPath = `/uploads/achievements/${req.files.supportingDocument[0].filename}`;
    }
    
    if (req.files?.media?.[0]) {
      if (mediaPath) {
        const oldPath = path.join(__dirname, '..', mediaPath);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      mediaPath = `/uploads/achievements/${req.files.media[0].filename}`;
    }
    
    await pool.execute(
      `UPDATE achievements SET
        title = ?, category = ?, date = ?, academic_year = ?, description = ?,
        department_id = ?, level = ?, uploaded_by = ?, verified_status = ?,
        supporting_document_path = ?, media_path = ?
      WHERE id = ?`,
      [
        title, category, date, academicYear, description,
        departmentId || null, level, uploadedBy || existing[0].uploaded_by,
        verifiedStatus || existing[0].verified_status, supportingDocPath, mediaPath, id
      ]
    );
    
    res.json({ success: true, message: 'Achievement updated successfully' });
  } catch (error) {
    console.error('Error updating achievement:', error);
    res.status(500).json({ success: false, message: 'Error updating achievement', error: error.message });
  }
});

// DELETE (deactivate) achievement
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('UPDATE achievements SET is_active = FALSE WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Achievement deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating achievement:', error);
    res.status(500).json({ success: false, message: 'Error deactivating achievement', error: error.message });
  }
});

// POST reactivate achievement
router.post('/:id/reactivate', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('UPDATE achievements SET is_active = TRUE WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Achievement reactivated successfully' });
  } catch (error) {
    console.error('Error reactivating achievement:', error);
    res.status(500).json({ success: false, message: 'Error reactivating achievement', error: error.message });
  }
});

module.exports = router;

