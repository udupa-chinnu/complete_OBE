const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for logo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/institution');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, 'logo' + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
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

// GET institution details
router.get('/', async (req, res) => {
  try {
    // Get basic info
    const [institutions] = await pool.execute('SELECT * FROM institutions LIMIT 1');
    
    if (institutions.length === 0) {
      return res.json({ success: true, data: null });
    }
    
    const institution = institutions[0];
    const institutionId = institution.id;
    
    // Get all related data
    const [contacts] = await pool.execute(
      'SELECT * FROM institution_contacts WHERE institution_id = ?',
      [institutionId]
    );
    const [governance] = await pool.execute(
      'SELECT * FROM institution_governance WHERE institution_id = ?',
      [institutionId]
    );
    const [academic] = await pool.execute(
      'SELECT * FROM institution_academic WHERE institution_id = ?',
      [institutionId]
    );
    const [infrastructure] = await pool.execute(
      'SELECT * FROM institution_infrastructure WHERE institution_id = ?',
      [institutionId]
    );
    const [recognitions] = await pool.execute(
      'SELECT * FROM institution_recognitions WHERE institution_id = ?',
      [institutionId]
    );
    const [miscellaneous] = await pool.execute(
      'SELECT * FROM institution_miscellaneous WHERE institution_id = ?',
      [institutionId]
    );
    
    institution.contact = contacts[0] || null;
    institution.governance = governance[0] || null;
    institution.academic = academic[0] || null;
    institution.infrastructure = infrastructure[0] || null;
    institution.recognitions = recognitions[0] || null;
    institution.miscellaneous = miscellaneous[0] || null;
    
    res.json({ success: true, data: institution });
  } catch (error) {
    console.error('Error fetching institution:', error);
    res.status(500).json({ success: false, message: 'Error fetching institution', error: error.message });
  }
});

// POST/PUT create or update institution basic info
router.post('/basic', upload.single('logo'), async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const {
      name, code, establishmentYear, instituteType, affiliationType,
      affiliatedUniversity, instituteCategory, accreditationStatus,
      naacGrade, nbaAccreditedPrograms
    } = req.body;
    
    // Check if institution exists
    const [existing] = await connection.execute('SELECT id FROM institutions LIMIT 1');
    
    let institutionId;
    const logoPath = req.file ? `/uploads/institution/${req.file.filename}` : null;
    
    if (existing.length > 0) {
      institutionId = existing[0].id;
      // Update existing
      await connection.execute(
        `UPDATE institutions SET
          name = ?, code = ?, establishment_year = ?, institute_type = ?,
          affiliation_type = ?, affiliated_university = ?, institute_category = ?,
          accreditation_status = ?, naac_grade = ?, nba_accredited_programs = ?,
          logo_path = COALESCE(?, logo_path)
        WHERE id = ?`,
        [
          name, code, establishmentYear, instituteType, affiliationType,
          affiliatedUniversity, instituteCategory, accreditationStatus,
          naacGrade, nbaAccreditedPrograms, logoPath, institutionId
        ]
      );
    } else {
      // Create new
      const [result] = await connection.execute(
        `INSERT INTO institutions (
          name, code, establishment_year, institute_type, affiliation_type,
          affiliated_university, institute_category, accreditation_status,
          naac_grade, nba_accredited_programs, logo_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name, code, establishmentYear, instituteType, affiliationType,
          affiliatedUniversity, instituteCategory, accreditationStatus,
          naacGrade, nbaAccreditedPrograms, logoPath
        ]
      );
      institutionId = result.insertId;
    }
    
    await connection.commit();
    res.json({ success: true, message: 'Institution basic info saved successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving institution basic info:', error);
    res.status(500).json({ success: false, message: 'Error saving institution basic info', error: error.message });
  } finally {
    connection.release();
  }
});

// POST/PUT create or update contact info
router.post('/contact', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const {
      addressLine1, addressLine2, city, district, state, country,
      pincode, officialEmail, officialContact, website, locationCoordinates
    } = req.body;
    
    // Get institution ID
    const [institutions] = await connection.execute('SELECT id FROM institutions LIMIT 1');
    if (institutions.length === 0) {
      return res.status(400).json({ success: false, message: 'Please create institution basic info first' });
    }
    const institutionId = institutions[0].id;
    
    // Check if contact exists
    const [existing] = await connection.execute(
      'SELECT id FROM institution_contacts WHERE institution_id = ?',
      [institutionId]
    );
    
    if (existing.length > 0) {
      await connection.execute(
        `UPDATE institution_contacts SET
          address_line1 = ?, address_line2 = ?, city = ?, district = ?, state = ?,
          country = ?, pincode = ?, official_email = ?, official_contact = ?,
          website = ?, location_coordinates = ?
        WHERE institution_id = ?`,
        [
          addressLine1, addressLine2, city, district, state, country,
          pincode, officialEmail, officialContact, website, locationCoordinates, institutionId
        ]
      );
    } else {
      await connection.execute(
        `INSERT INTO institution_contacts (
          institution_id, address_line1, address_line2, city, district, state,
          country, pincode, official_email, official_contact, website, location_coordinates
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          institutionId, addressLine1, addressLine2, city, district, state,
          country, pincode, officialEmail, officialContact, website, locationCoordinates
        ]
      );
    }
    
    await connection.commit();
    res.json({ success: true, message: 'Contact info saved successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving contact info:', error);
    res.status(500).json({ success: false, message: 'Error saving contact info', error: error.message });
  } finally {
    connection.release();
  }
});

// POST/PUT create or update governance info
router.post('/governance', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const {
      headOfInstitution, headDesignation, headEmail, headPhone,
      governingBodyExists, governingBodyMembers, trustName,
      registrationNumber, trustRegistrationDate
    } = req.body;
    
    const [institutions] = await connection.execute('SELECT id FROM institutions LIMIT 1');
    if (institutions.length === 0) {
      return res.status(400).json({ success: false, message: 'Please create institution basic info first' });
    }
    const institutionId = institutions[0].id;
    
    const [existing] = await connection.execute(
      'SELECT id FROM institution_governance WHERE institution_id = ?',
      [institutionId]
    );
    
    if (existing.length > 0) {
      await connection.execute(
        `UPDATE institution_governance SET
          head_of_institution = ?, head_designation = ?, head_email = ?, head_phone = ?,
          governing_body_exists = ?, governing_body_members = ?, trust_name = ?,
          registration_number = ?, trust_registration_date = ?
        WHERE institution_id = ?`,
        [
          headOfInstitution, headDesignation, headEmail, headPhone,
          governingBodyExists, governingBodyMembers, trustName,
          registrationNumber, trustRegistrationDate || null, institutionId
        ]
      );
    } else {
      await connection.execute(
        `INSERT INTO institution_governance (
          institution_id, head_of_institution, head_designation, head_email, head_phone,
          governing_body_exists, governing_body_members, trust_name,
          registration_number, trust_registration_date
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          institutionId, headOfInstitution, headDesignation, headEmail, headPhone,
          governingBodyExists, governingBodyMembers, trustName,
          registrationNumber, trustRegistrationDate || null
        ]
      );
    }
    
    await connection.commit();
    res.json({ success: true, message: 'Governance info saved successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving governance info:', error);
    res.status(500).json({ success: false, message: 'Error saving governance info', error: error.message });
  } finally {
    connection.release();
  }
});

// POST/PUT create or update academic info
router.post('/academic', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const {
      ugPrograms, pgPrograms, phdPrograms, totalDepartments,
      facultyStrength, studentIntake, academicCalendarAvailable,
      examinationSystem, mediumOfInstruction
    } = req.body;
    
    const [institutions] = await connection.execute('SELECT id FROM institutions LIMIT 1');
    if (institutions.length === 0) {
      return res.status(400).json({ success: false, message: 'Please create institution basic info first' });
    }
    const institutionId = institutions[0].id;
    
    const [existing] = await connection.execute(
      'SELECT id FROM institution_academic WHERE institution_id = ?',
      [institutionId]
    );
    
    if (existing.length > 0) {
      await connection.execute(
        `UPDATE institution_academic SET
          ug_programs = ?, pg_programs = ?, phd_programs = ?, total_departments = ?,
          faculty_strength = ?, student_intake = ?, academic_calendar_available = ?,
          examination_system = ?, medium_of_instruction = ?
        WHERE institution_id = ?`,
        [
          ugPrograms, pgPrograms, phdPrograms, totalDepartments,
          facultyStrength, studentIntake, academicCalendarAvailable,
          examinationSystem, mediumOfInstruction, institutionId
        ]
      );
    } else {
      await connection.execute(
        `INSERT INTO institution_academic (
          institution_id, ug_programs, pg_programs, phd_programs, total_departments,
          faculty_strength, student_intake, academic_calendar_available,
          examination_system, medium_of_instruction
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          institutionId, ugPrograms, pgPrograms, phdPrograms, totalDepartments,
          facultyStrength, studentIntake, academicCalendarAvailable,
          examinationSystem, mediumOfInstruction
        ]
      );
    }
    
    await connection.commit();
    res.json({ success: true, message: 'Academic info saved successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving academic info:', error);
    res.status(500).json({ success: false, message: 'Error saving academic info', error: error.message });
  } finally {
    connection.release();
  }
});

// POST/PUT create or update infrastructure info
router.post('/infrastructure', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const {
      campusArea, builtUpArea, classrooms, labs, libraryAvailable,
      internetBandwidth, wifiEnabled, hostelAvailable,
      transportAvailable, busesCount
    } = req.body;
    
    const [institutions] = await connection.execute('SELECT id FROM institutions LIMIT 1');
    if (institutions.length === 0) {
      return res.status(400).json({ success: false, message: 'Please create institution basic info first' });
    }
    const institutionId = institutions[0].id;
    
    const [existing] = await connection.execute(
      'SELECT id FROM institution_infrastructure WHERE institution_id = ?',
      [institutionId]
    );
    
    if (existing.length > 0) {
      await connection.execute(
        `UPDATE institution_infrastructure SET
          campus_area = ?, built_up_area = ?, classrooms = ?, labs = ?,
          library_available = ?, internet_bandwidth = ?, wifi_enabled = ?,
          hostel_available = ?, transport_available = ?, buses_count = ?
        WHERE institution_id = ?`,
        [
          campusArea, builtUpArea, classrooms, labs, libraryAvailable,
          internetBandwidth, wifiEnabled, hostelAvailable,
          transportAvailable, busesCount, institutionId
        ]
      );
    } else {
      await connection.execute(
        `INSERT INTO institution_infrastructure (
          institution_id, campus_area, built_up_area, classrooms, labs,
          library_available, internet_bandwidth, wifi_enabled,
          hostel_available, transport_available, buses_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          institutionId, campusArea, builtUpArea, classrooms, labs,
          libraryAvailable, internetBandwidth, wifiEnabled,
          hostelAvailable, transportAvailable, busesCount
        ]
      );
    }
    
    await connection.commit();
    res.json({ success: true, message: 'Infrastructure info saved successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving infrastructure info:', error);
    res.status(500).json({ success: false, message: 'Error saving infrastructure info', error: error.message });
  } finally {
    connection.release();
  }
});

// POST/PUT create or update recognitions info
router.post('/recognitions', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const {
      ugcRecognitionDate, aicteApprovalYear, nbaAccreditationDetails,
      naacAccreditationDetails, isoCertification, otherAwards
    } = req.body;
    
    const [institutions] = await connection.execute('SELECT id FROM institutions LIMIT 1');
    if (institutions.length === 0) {
      return res.status(400).json({ success: false, message: 'Please create institution basic info first' });
    }
    const institutionId = institutions[0].id;
    
    const [existing] = await connection.execute(
      'SELECT id FROM institution_recognitions WHERE institution_id = ?',
      [institutionId]
    );
    
    if (existing.length > 0) {
      await connection.execute(
        `UPDATE institution_recognitions SET
          ugc_recognition_date = ?, aicte_approval_year = ?, nba_accreditation_details = ?,
          naac_accreditation_details = ?, iso_certification = ?, other_awards = ?
        WHERE institution_id = ?`,
        [
          ugcRecognitionDate || null, aicteApprovalYear || null, nbaAccreditationDetails,
          naacAccreditationDetails, isoCertification, otherAwards, institutionId
        ]
      );
    } else {
      await connection.execute(
        `INSERT INTO institution_recognitions (
          institution_id, ugc_recognition_date, aicte_approval_year, nba_accreditation_details,
          naac_accreditation_details, iso_certification, other_awards
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          institutionId, ugcRecognitionDate || null, aicteApprovalYear || null, nbaAccreditationDetails,
          naacAccreditationDetails, isoCertification, otherAwards
        ]
      );
    }
    
    await connection.commit();
    res.json({ success: true, message: 'Recognitions info saved successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving recognitions info:', error);
    res.status(500).json({ success: false, message: 'Error saving recognitions info', error: error.message });
  } finally {
    connection.release();
  }
});

// POST/PUT create or update miscellaneous info
router.post('/miscellaneous', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    const {
      vision, mission, coreValues, collegeAnthem, notableAlumni, socialMediaLinks
    } = req.body;
    
    const [institutions] = await connection.execute('SELECT id FROM institutions LIMIT 1');
    if (institutions.length === 0) {
      return res.status(400).json({ success: false, message: 'Please create institution basic info first' });
    }
    const institutionId = institutions[0].id;
    
    const [existing] = await connection.execute(
      'SELECT id FROM institution_miscellaneous WHERE institution_id = ?',
      [institutionId]
    );
    
    if (existing.length > 0) {
      await connection.execute(
        `UPDATE institution_miscellaneous SET
          vision = ?, mission = ?, core_values = ?, college_anthem = ?,
          notable_alumni = ?, social_media_links = ?
        WHERE institution_id = ?`,
        [
          vision, mission, coreValues, collegeAnthem, notableAlumni, socialMediaLinks, institutionId
        ]
      );
    } else {
      await connection.execute(
        `INSERT INTO institution_miscellaneous (
          institution_id, vision, mission, core_values, college_anthem,
          notable_alumni, social_media_links
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          institutionId, vision, mission, coreValues, collegeAnthem, notableAlumni, socialMediaLinks
        ]
      );
    }
    
    await connection.commit();
    res.json({ success: true, message: 'Miscellaneous info saved successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Error saving miscellaneous info:', error);
    res.status(500).json({ success: false, message: 'Error saving miscellaneous info', error: error.message });
  } finally {
    connection.release();
  }
});

module.exports = router;

