const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/mandatory');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'upload-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|xlsx|xls|jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Allowed: PDF, DOC, DOCX, XLSX, XLS, JPG, PNG'));
  }
});

// GET all mandatory uploads (active only by default)
router.get('/', async (req, res) => {
  try {
    const { includeInactive, type, departmentId } = req.query;
    let query = `
      SELECT 
        u.*,
        d.name as department_name,
        d.code as department_code
      FROM mandatory_uploads u
      LEFT JOIN departments d ON u.department_id = d.id
      WHERE 1=1
    `;
    
    const params = [];
    
    if (includeInactive !== 'true') {
      query += ' AND u.is_active = TRUE';
    }
    
    if (type) {
      query += ' AND u.type = ?';
      params.push(type);
    }
    
    if (departmentId) {
      query += ' AND u.department_id = ?';
      params.push(departmentId);
    }
    
    query += ' ORDER BY u.upload_date DESC, u.created_at DESC';
    
    const [uploads] = await pool.execute(query, params);
    
    res.json({ success: true, data: uploads });
  } catch (error) {
    console.error('Error fetching uploads:', error);
    res.status(500).json({ success: false, message: 'Error fetching uploads', error: error.message });
  }
});

// GET single upload by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [uploads] = await pool.execute(
      `SELECT 
        u.*,
        d.name as department_name,
        d.code as department_code
      FROM mandatory_uploads u
      LEFT JOIN departments d ON u.department_id = d.id
      WHERE u.id = ?`,
      [id]
    );
    
    if (uploads.length === 0) {
      return res.status(404).json({ success: false, message: 'Upload not found' });
    }
    
    res.json({ success: true, data: uploads[0] });
  } catch (error) {
    console.error('Error fetching upload:', error);
    res.status(500).json({ success: false, message: 'Error fetching upload', error: error.message });
  }
});

// POST create new mandatory upload
router.post('/', upload.single('document'), async (req, res) => {
  try {
    const {
      title,
      type,
      departmentId,
      uploadDate
    } = req.body;
    
    // Validate required fields
    if (!title || !type || !req.file) {
      return res.status(400).json({ success: false, message: 'Title, type, and document are required' });
    }
    
    const documentPath = `/uploads/mandatory/${req.file.filename}`;
    
    const [result] = await pool.execute(
      `INSERT INTO mandatory_uploads (
        title, type, department_id, document_path, upload_date
      ) VALUES (?, ?, ?, ?, ?)`,
      [
        title,
        type,
        departmentId || null,
        documentPath,
        uploadDate || new Date().toISOString().split('T')[0]
      ]
    );
    
    res.status(201).json({ 
      success: true, 
      message: 'Document uploaded successfully', 
      data: { id: result.insertId } 
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ success: false, message: 'Error uploading document', error: error.message });
  }
});

// PUT update mandatory upload
router.put('/:id', upload.single('document'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      departmentId,
      uploadDate
    } = req.body;
    
    // Check if upload exists
    const [existing] = await pool.execute('SELECT * FROM mandatory_uploads WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ success: false, message: 'Upload not found' });
    }
    
    // Handle file path - keep existing if no new file uploaded
    let documentPath = existing[0].document_path;
    
    if (req.file) {
      // Delete old file
      if (documentPath) {
        const oldPath = path.join(__dirname, '..', documentPath);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      documentPath = `/uploads/mandatory/${req.file.filename}`;
    }
    
    // Format date properly for MySQL (YYYY-MM-DD)
    let formattedDate = existing[0].upload_date;
    if (uploadDate) {
      // If it's an ISO string, extract just the date part
      const dateObj = new Date(uploadDate);
      if (!isNaN(dateObj.getTime())) {
        formattedDate = dateObj.toISOString().split('T')[0];
      } else if (uploadDate.includes('T')) {
        // Handle ISO string format
        formattedDate = uploadDate.split('T')[0];
      } else {
        // Assume it's already in YYYY-MM-DD format
        formattedDate = uploadDate;
      }
    }
    
    await pool.execute(
      `UPDATE mandatory_uploads SET
        title = ?, type = ?, department_id = ?, document_path = ?, upload_date = ?
      WHERE id = ?`,
      [
        title, type, departmentId || null, documentPath,
        formattedDate, id
      ]
    );
    
    res.json({ success: true, message: 'Upload updated successfully' });
  } catch (error) {
    console.error('Error updating upload:', error);
    res.status(500).json({ success: false, message: 'Error updating upload', error: error.message });
  }
});

// DELETE (deactivate) mandatory upload
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('UPDATE mandatory_uploads SET is_active = FALSE WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Upload deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating upload:', error);
    res.status(500).json({ success: false, message: 'Error deactivating upload', error: error.message });
  }
});

// POST reactivate mandatory upload
router.post('/:id/reactivate', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('UPDATE mandatory_uploads SET is_active = TRUE WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Upload reactivated successfully' });
  } catch (error) {
    console.error('Error reactivating upload:', error);
    res.status(500).json({ success: false, message: 'Error reactivating upload', error: error.message });
  }
});

module.exports = router;

