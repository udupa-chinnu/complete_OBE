const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { log } = require('console');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/faculties');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'faculty-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// GET all faculties (active only by default)
router.get('/', async (req, res) => {
  try {
    const { includeInactive } = req.query;
    let query = `
      SELECT 
        f.*,
        fe.appointment_letter_number,
        fe.appointment_date,
        fe.parent_department,
        fe.joining_date,
        fe.designation_date,
        fe.associate_type,
        fe.currently_associated,
        fe.appointed_to,
        fe.academic_experience,
        fe.research_experience,
        fe.industry_experience
      FROM faculties f
      LEFT JOIN faculty_employment fe ON f.id = fe.faculty_id
    `;
    
    if (includeInactive !== 'true') {
      query += ' WHERE f.is_active = TRUE';
    }
    
    query += ' ORDER BY f.created_at DESC';
    
    const [faculties] = await pool.execute(query);
    
    // Get qualifications for each faculty
    for (let faculty of faculties) {
      const [qualifications] = await pool.execute(
        'SELECT * FROM faculty_qualifications WHERE faculty_id = ? AND is_active = TRUE',
        [faculty.id]
      );
      faculty.qualifications = qualifications;
    }
    
    res.json({ success: true, data: faculties });
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.status(500).json({ success: false, message: 'Error fetching faculties', error: error.message });
  }
});

// GET single faculty by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [faculties] = await pool.execute(
      `SELECT 
        f.*,
        fe.appointment_letter_number,
        fe.appointment_date,
        fe.parent_department,
        fe.joining_date,
        fe.designation_date,
        fe.associate_type,
        fe.currently_associated,
        fe.appointed_to,
        fe.academic_experience,
        fe.research_experience,
        fe.industry_experience
      FROM faculties f
      LEFT JOIN faculty_employment fe ON f.id = fe.faculty_id
      WHERE f.id = ?`,
      [id]
    );
    
    if (faculties.length === 0) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }
    
    const faculty = faculties[0];
    
    // Get qualifications
    const [qualifications] = await pool.execute(
      'SELECT * FROM faculty_qualifications WHERE faculty_id = ? AND is_active = TRUE',
      [id]
    );
    faculty.qualifications = qualifications;
    
    // Get additional details
    const [additionalDetails] = await pool.execute(
      'SELECT * FROM faculty_additional_details WHERE faculty_id = ?',
      [id]
    );
    if (additionalDetails.length > 0) {
      const details = additionalDetails[0];
      faculty.height = details.height;
      faculty.contact_number = details.contact_number;
      faculty.bank_account_number = details.bank_account_number;
      faculty.bank_name = details.bank_name;
      faculty.bank_branch = details.bank_branch;
      faculty.ifsc_code = details.ifsc_code;
      faculty.pan = details.pan;
      faculty.aadhar_number = details.aadhar_number;
      faculty.marital_status = details.marital_status;
      faculty.spouse_name = details.spouse_name;
      faculty.uan = details.uan;
      faculty.google_scholar = details.google_scholar;
      faculty.scopus_id = details.scopus_id;
      faculty.orcid = details.orcid;
      faculty.pre_existing_ailments = details.pre_existing_ailments;
    }
    
    res.json({ success: true, data: faculty });
  } catch (error) {
    console.error('Error fetching faculty:', error);
    res.status(500).json({ success: false, message: 'Error fetching faculty', error: error.message });
  }
});

// GET active faculties for dropdown (simplified)
router.get('/dropdown/active', async (req, res) => {
  try {
    const [faculties] = await pool.execute(
      `SELECT 
        id,
        faculty_id,
        CONCAT(COALESCE(title, ''), ' ', first_name, ' ', COALESCE(middle_name, ''), ' ', last_name) as full_name,
        designation
      FROM faculties 
      WHERE is_active = TRUE 
      ORDER BY first_name, last_name`
    );
    console.log("fetching")
    res.json({ success: true, data: faculties });
  } catch (error) {
    console.error('Error fetching faculties for dropdown:', error);
    res.status(500).json({ success: false, message: 'Error fetching faculties', error: error.message });
  }
});

// POST create new faculty
router.post('/', upload.single('profilePhoto'), async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const {
      facultyId, title, firstName, middleName, lastName, callName, initials,
      designation, dateOfBirth, gender, permanentAddress, currentAddress,
      city, state, pincode, residenceNumber, personalEmail, officialEmail,
      nationality, religion, category, caste, bloodGroup,
      appointmentLetterNumber, appointmentDate, parentDepartment,
      joiningDate, designationDate, associateType, currentlyAssociated,
      appointedTo, academicExperience, researchExperience, industryExperience
    } = req.body;
    
    // Insert faculty personal info
    const [facultyResult] = await connection.execute(
      `INSERT INTO faculties (
        faculty_id, title, first_name, middle_name, last_name, call_name, initials,
        designation, date_of_birth, gender, permanent_address, current_address,
        city, state, pincode, residence_number, personal_email, official_email,
        nationality, religion, category, caste, blood_group, profile_photo_path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        facultyId, title, firstName, middleName, lastName, callName, initials,
        designation, dateOfBirth || null, gender, permanentAddress, currentAddress,
        city, state, pincode, residenceNumber, personalEmail, officialEmail,
        nationality, religion, category, caste, bloodGroup,
        req.file ? `/uploads/faculties/${req.file.filename}` : null
      ]
    );
    
    const facultyIdInserted = facultyResult.insertId;
    
    // Auto-create user account for faculty if official email is provided
    if (officialEmail) {
      try {
        const bcrypt = require('bcryptjs');
        const defaultPassword = 'fac123';
        const passwordHash = await bcrypt.hash(defaultPassword, 10);
        
        // Check if user already exists with this email
        const [existingUser] = await connection.execute(
          'SELECT id FROM users WHERE email = ? OR username = ?',
          [officialEmail, officialEmail]
        );
        
        if (existingUser.length === 0) {
          // Create user account
          const [userResult] = await connection.execute(
            `INSERT INTO users (username, email, password_hash, user_type, faculty_id, is_active) 
             VALUES (?, ?, ?, 'faculty', ?, TRUE)`,
            [officialEmail, officialEmail, passwordHash, facultyIdInserted]
          );
          
          const userId = userResult.insertId;
          
          // Automatically assign "faculty" role
          await connection.execute(
            'INSERT INTO user_roles (user_id, role) VALUES (?, ?)',
            [userId, 'faculty']
          );
          
          console.log(`User account created for faculty: ${officialEmail} with default password: ${defaultPassword}`);
        } else {
          // Update existing user to link to this faculty
          await connection.execute(
            'UPDATE users SET faculty_id = ? WHERE id = ?',
            [facultyIdInserted, existingUser[0].id]
          );
          console.log(`Existing user account linked to faculty: ${officialEmail}`);
        }
      } catch (userError) {
        // Log error but don't fail faculty creation
        console.error('Error creating user account for faculty:', userError);
      }
    }
    
    // Insert employment info
    await connection.execute(
      `INSERT INTO faculty_employment (
        faculty_id, appointment_letter_number, appointment_date, parent_department,
        joining_date, designation_date, associate_type, currently_associated,
        appointed_to, academic_experience, research_experience, industry_experience
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        facultyIdInserted, appointmentLetterNumber, appointmentDate || null,
        parentDepartment, joiningDate || null, designationDate || null,
        associateType, currentlyAssociated, appointedTo,
        academicExperience || 0, researchExperience || 0, industryExperience || 0
      ]
    );
    
    // Insert additional details if provided
    if (contactNumber || bankAccountNumber || pan || aadharNumber) {
      await connection.execute(
        `INSERT INTO faculty_additional_details (
          faculty_id, height, contact_number, bank_account_number, bank_name, bank_branch,
          ifsc_code, pan, aadhar_number, marital_status, spouse_name, uan,
          google_scholar, scopus_id, orcid, pre_existing_ailments
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          facultyIdInserted, height || null, contactNumber || null, bankAccountNumber || null,
          bankName || null, bankBranch || null, ifscCode || null, pan || null,
          aadharNumber || null, maritalStatus || 'Unmarried', spouseName || null, uan || null,
          googleScholar || null, scopusId || null, orcId || null, preExistingAilments || null
        ]
      );
    }
    
    await connection.commit();
    res.status(201).json({ success: true, message: 'Faculty created successfully', data: { id: facultyIdInserted } });
  } catch (error) {
    await connection.rollback();
    console.error('Error creating faculty:', error);
    res.status(500).json({ success: false, message: 'Error creating faculty', error: error.message });
  } finally {
    connection.release();
  }
});

// PUT update faculty
router.put('/:id', upload.single('profilePhoto'), async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const { id } = req.params;
    const {
      facultyId, title, firstName, middleName, lastName, callName, initials,
      designation, dateOfBirth, gender, permanentAddress, currentAddress,
      city, state, pincode, residenceNumber, personalEmail, officialEmail,
      nationality, religion, category, caste, bloodGroup,
      appointmentLetterNumber, appointmentDate, parentDepartment,
      joiningDate, designationDate, associateType, currentlyAssociated,
      appointedTo, academicExperience, researchExperience, industryExperience,
      // Additional details
      height, contactNumber, bankAccountNumber, bankName, bankBranch, ifscCode,
      pan, aadharNumber, maritalStatus, spouseName, uan,
      googleScholar, scopusId, orcId, preExistingAilments
    } = req.body;
    
    // Get existing profile photo path
    const [existing] = await connection.execute('SELECT profile_photo_path FROM faculties WHERE id = ?', [id]);
    let profilePhotoPath = existing[0]?.profile_photo_path;
    
    // Update profile photo if new file uploaded
    if (req.file) {
      // Delete old file if exists
      if (profilePhotoPath) {
        const oldFilePath = path.join(__dirname, '..', profilePhotoPath);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      profilePhotoPath = `/uploads/faculties/${req.file.filename}`;
    }
    
    // Update faculty personal info
    await connection.execute(
      `UPDATE faculties SET
        faculty_id = ?, title = ?, first_name = ?, middle_name = ?, last_name = ?,
        call_name = ?, initials = ?, designation = ?, date_of_birth = ?, gender = ?,
        permanent_address = ?, current_address = ?, city = ?, state = ?, pincode = ?,
        residence_number = ?, personal_email = ?, official_email = ?, nationality = ?,
        religion = ?, category = ?, caste = ?, blood_group = ?, profile_photo_path = ?
      WHERE id = ?`,
      [
        facultyId, title, firstName, middleName, lastName, callName, initials,
        designation, dateOfBirth || null, gender, permanentAddress, currentAddress,
        city, state, pincode, residenceNumber, personalEmail, officialEmail,
        nationality, religion, category, caste, bloodGroup, profilePhotoPath, id
      ]
    );
    
    // Update employment info
    await connection.execute(
      `UPDATE faculty_employment SET
        appointment_letter_number = ?, appointment_date = ?, parent_department = ?,
        joining_date = ?, designation_date = ?, associate_type = ?, currently_associated = ?,
        appointed_to = ?, academic_experience = ?, research_experience = ?, industry_experience = ?
      WHERE faculty_id = ?`,
      [
        appointmentLetterNumber, appointmentDate || null, parentDepartment,
        joiningDate || null, designationDate || null, associateType, currentlyAssociated,
        appointedTo, academicExperience || 0, researchExperience || 0, industryExperience || 0, id
      ]
    );
    
    // Update or insert additional details
    const [existingDetails] = await connection.execute(
      'SELECT id FROM faculty_additional_details WHERE faculty_id = ?',
      [id]
    );
    
    if (existingDetails.length > 0) {
      // Update existing
      await connection.execute(
        `UPDATE faculty_additional_details SET
          height = ?, contact_number = ?, bank_account_number = ?, bank_name = ?, bank_branch = ?,
          ifsc_code = ?, pan = ?, aadhar_number = ?, marital_status = ?, spouse_name = ?, uan = ?,
          google_scholar = ?, scopus_id = ?, orcid = ?, pre_existing_ailments = ?
        WHERE faculty_id = ?`,
        [
          height || null, contactNumber || null, bankAccountNumber || null,
          bankName || null, bankBranch || null, ifscCode || null, pan || null,
          aadharNumber || null, maritalStatus || 'Unmarried', spouseName || null, uan || null,
          googleScholar || null, scopusId || null, orcId || null, preExistingAilments || null, id
        ]
      );
    } else if (contactNumber || bankAccountNumber || pan || aadharNumber) {
      // Insert new
      await connection.execute(
        `INSERT INTO faculty_additional_details (
          faculty_id, height, contact_number, bank_account_number, bank_name, bank_branch,
          ifsc_code, pan, aadhar_number, marital_status, spouse_name, uan,
          google_scholar, scopus_id, orcid, pre_existing_ailments
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, height || null, contactNumber || null, bankAccountNumber || null,
          bankName || null, bankBranch || null, ifscCode || null, pan || null,
          aadharNumber || null, maritalStatus || 'Unmarried', spouseName || null, uan || null,
          googleScholar || null, scopusId || null, orcId || null, preExistingAilments || null
        ]
      );
    }
    
    await connection.commit();
    res.json({ success: true, message: 'Faculty updated successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error updating faculty:', error);
    res.status(500).json({ success: false, message: 'Error updating faculty', error: error.message });
  } finally {
    connection.release();
  }
});

// DELETE (deactivate) faculty
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('UPDATE faculties SET is_active = FALSE WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Faculty deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating faculty:', error);
    res.status(500).json({ success: false, message: 'Error deactivating faculty', error: error.message });
  }
});

// POST reactivate faculty
router.post('/:id/reactivate', async (req, res) => {
  try {
    const { id } = req.params;
    
    await pool.execute('UPDATE faculties SET is_active = TRUE WHERE id = ?', [id]);
    
    res.json({ success: true, message: 'Faculty reactivated successfully' });
  } catch (error) {
    console.error('Error reactivating faculty:', error);
    res.status(500).json({ success: false, message: 'Error reactivating faculty', error: error.message });
  }
});

module.exports = router;

