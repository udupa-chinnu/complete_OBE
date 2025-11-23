-- Education Portal Database Schema (3NF Normalized)
-- Database: education_portal

CREATE DATABASE IF NOT EXISTS education_portal;
USE education_portal;

-- ============================================
-- INSTITUTION TABLES
-- ============================================

-- Institution Basic Information
CREATE TABLE IF NOT EXISTS institutions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    establishment_year YEAR NOT NULL,
    institute_type ENUM('Private', 'Government', 'Aided') NOT NULL,
    affiliation_type ENUM('Affiliated', 'Autonomous', 'Deemed') NOT NULL,
    affiliated_university VARCHAR(255),
    institute_category VARCHAR(100),
    accreditation_status VARCHAR(100),
    naac_grade VARCHAR(10),
    nba_accredited_programs TEXT,
    logo_path VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Institution Contact Information
CREATE TABLE IF NOT EXISTS institution_contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    institution_id INT NOT NULL,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    district VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100) DEFAULT 'India',
    pincode VARCHAR(10),
    official_email VARCHAR(255),
    official_contact VARCHAR(20),
    website VARCHAR(255),
    location_coordinates VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_institution_contact (institution_id)
);

-- Institution Governance
CREATE TABLE IF NOT EXISTS institution_governance (
    id INT PRIMARY KEY AUTO_INCREMENT,
    institution_id INT NOT NULL,
    head_of_institution VARCHAR(255),
    head_designation VARCHAR(100),
    head_email VARCHAR(255),
    head_phone VARCHAR(20),
    governing_body_exists ENUM('Yes', 'No') DEFAULT 'Yes',
    governing_body_members TEXT,
    trust_name VARCHAR(255),
    registration_number VARCHAR(100),
    trust_registration_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_institution_governance (institution_id)
);

-- Institution Academic Information
CREATE TABLE IF NOT EXISTS institution_academic (
    id INT PRIMARY KEY AUTO_INCREMENT,
    institution_id INT NOT NULL,
    ug_programs INT DEFAULT 0,
    pg_programs INT DEFAULT 0,
    phd_programs INT DEFAULT 0,
    total_departments INT DEFAULT 0,
    faculty_strength INT DEFAULT 0,
    student_intake INT DEFAULT 0,
    academic_calendar_available ENUM('Yes', 'No') DEFAULT 'Yes',
    examination_system VARCHAR(50),
    medium_of_instruction VARCHAR(50) DEFAULT 'English',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_institution_academic (institution_id)
);

-- Institution Infrastructure
CREATE TABLE IF NOT EXISTS institution_infrastructure (
    id INT PRIMARY KEY AUTO_INCREMENT,
    institution_id INT NOT NULL,
    campus_area DECIMAL(10, 2),
    built_up_area DECIMAL(10, 2),
    classrooms INT DEFAULT 0,
    labs INT DEFAULT 0,
    library_available ENUM('Yes', 'No') DEFAULT 'Yes',
    internet_bandwidth INT,
    wifi_enabled ENUM('Yes', 'No') DEFAULT 'Yes',
    hostel_available ENUM('Yes', 'No') DEFAULT 'No',
    transport_available ENUM('Yes', 'No') DEFAULT 'No',
    buses_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_institution_infrastructure (institution_id)
);

-- Institution Recognitions
CREATE TABLE IF NOT EXISTS institution_recognitions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    institution_id INT NOT NULL,
    ugc_recognition_date DATE,
    aicte_approval_year YEAR,
    nba_accreditation_details TEXT,
    naac_accreditation_details TEXT,
    iso_certification VARCHAR(255),
    other_awards TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_institution_recognitions (institution_id)
);

-- Institution Miscellaneous
CREATE TABLE IF NOT EXISTS institution_miscellaneous (
    id INT PRIMARY KEY AUTO_INCREMENT,
    institution_id INT NOT NULL,
    vision TEXT,
    mission TEXT,
    core_values TEXT,
    college_anthem TEXT,
    notable_alumni TEXT,
    social_media_links TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE,
    UNIQUE KEY unique_institution_miscellaneous (institution_id)
);

-- ============================================
-- FACULTY TABLES
-- ============================================

-- Faculties (Personal Information)
CREATE TABLE IF NOT EXISTS faculties (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(20),
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    call_name VARCHAR(100),
    initials VARCHAR(20),
    designation VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    permanent_address TEXT,
    current_address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    residence_number VARCHAR(20),
    personal_email VARCHAR(255),
    official_email VARCHAR(255) UNIQUE,
    nationality VARCHAR(50) DEFAULT 'Indian',
    religion VARCHAR(50),
    category VARCHAR(20),
    caste VARCHAR(50),
    blood_group VARCHAR(10),
    profile_photo_path VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Faculty Employment Information
CREATE TABLE IF NOT EXISTS faculty_employment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    appointment_letter_number VARCHAR(100),
    appointment_date DATE,
    parent_department VARCHAR(255),
    joining_date DATE,
    designation_date DATE,
    associate_type ENUM('Regular', 'Contracted', 'Visiting', 'Guest', 'Any Other'),
    currently_associated ENUM('Yes', 'No') DEFAULT 'Yes',
    appointed_to VARCHAR(255),
    academic_experience DECIMAL(4, 1) DEFAULT 0,
    research_experience DECIMAL(4, 1) DEFAULT 0,
    industry_experience DECIMAL(4, 1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE CASCADE,
    UNIQUE KEY unique_faculty_employment (faculty_id)
);

-- Faculty Qualifications (can have multiple qualifications)
CREATE TABLE IF NOT EXISTS faculty_qualifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    qualification_type ENUM('UG', 'PG', 'PhD', 'Post-Doc', 'Other') NOT NULL,
    degree VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    university VARCHAR(255),
    year_of_completion YEAR,
    percentage_cgpa DECIMAL(5, 2),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE CASCADE
);

-- Faculty Additional Details
CREATE TABLE IF NOT EXISTS faculty_additional_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    faculty_id INT NOT NULL,
    height VARCHAR(50),
    contact_number VARCHAR(20),
    bank_account_number VARCHAR(50),
    bank_name VARCHAR(255),
    bank_branch VARCHAR(255),
    ifsc_code VARCHAR(20),
    pan VARCHAR(20),
    aadhar_number VARCHAR(20),
    marital_status ENUM('Married', 'Unmarried', 'Divorced', 'Widowed') DEFAULT 'Unmarried',
    spouse_name VARCHAR(255),
    uan VARCHAR(50),
    google_scholar VARCHAR(255),
    scopus_id VARCHAR(255),
    orcid VARCHAR(255),
    pre_existing_ailments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE CASCADE,
    UNIQUE KEY unique_faculty_additional (faculty_id)
);

-- ============================================
-- DEPARTMENT TABLES
-- ============================================

-- Departments
CREATE TABLE IF NOT EXISTS departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    hod_faculty_id INT,
    establishment_year YEAR,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    website VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hod_faculty_id) REFERENCES faculties(id) ON DELETE SET NULL
);

-- ============================================
-- PROGRAM TABLES
-- ============================================

-- Programs
CREATE TABLE IF NOT EXISTS programs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    level ENUM('UG', 'PG', 'Diploma', 'Certificate', 'Any Other') NOT NULL,
    type VARCHAR(100) NOT NULL,
    other_type VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(100) UNIQUE NOT NULL,
    department_id INT NOT NULL,
    parental_department VARCHAR(255),
    sanctioned_intake INT NOT NULL,
    commencement_year YEAR NOT NULL,
    aicte_approval_year YEAR,
    aicte_approval_doc_path VARCHAR(255),
    intake_changed ENUM('Yes', 'No') DEFAULT 'No',
    new_intake INT,
    intake_change_doc_path VARCHAR(255),
    accreditation_status VARCHAR(100),
    accreditation_file_path VARCHAR(255),
    duration INT NOT NULL COMMENT 'Duration in years',
    total_credits INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT
);

-- ============================================
-- ACHIEVEMENTS TABLES
-- ============================================

-- Institutional Achievements
CREATE TABLE IF NOT EXISTS achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    category ENUM('Academic', 'Research', 'Sports', 'Outreach', 'Innovation', 'Placement', 'Rankings', 'Awards', 'Cultural', 'Others') NOT NULL,
    date DATE NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    department_id INT,
    level ENUM('International', 'National', 'State', 'University', 'District', 'College') NOT NULL,
    uploaded_by VARCHAR(255),
    verified_status ENUM('Verified', 'Pending', 'Rejected') DEFAULT 'Pending',
    supporting_document_path VARCHAR(255),
    media_path VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- ============================================
-- UPLOADS TABLES
-- ============================================

-- Mandatory Uploads
CREATE TABLE IF NOT EXISTS mandatory_uploads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    type ENUM('Accreditation Reports', 'Course Closure', 'Research Closure', 'Faculty Development', 'Student Achievement', 'Infrastructure Report', 'Annual Report', 'Other') NOT NULL,
    department_id INT,
    document_path VARCHAR(255) NOT NULL,
    upload_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_faculties_faculty_id ON faculties(faculty_id);
CREATE INDEX idx_faculties_official_email ON faculties(official_email);
CREATE INDEX idx_faculties_is_active ON faculties(is_active);
CREATE INDEX idx_departments_code ON departments(code);
CREATE INDEX idx_departments_is_active ON departments(is_active);
CREATE INDEX idx_programs_code ON programs(code);
CREATE INDEX idx_programs_department_id ON programs(department_id);
CREATE INDEX idx_programs_is_active ON programs(is_active);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_achievements_department_id ON achievements(department_id);
CREATE INDEX idx_achievements_is_active ON achievements(is_active);
CREATE INDEX idx_uploads_type ON mandatory_uploads(type);
CREATE INDEX idx_uploads_department_id ON mandatory_uploads(department_id);
CREATE INDEX idx_uploads_is_active ON mandatory_uploads(is_active);

-- ============================================
-- AUTHENTICATION & USER MANAGEMENT TABLES
-- ============================================

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('admin', 'academic', 'faculty', 'student') NOT NULL,
    faculty_id INT NULL COMMENT 'Reference to faculties table if user_type is faculty',
    student_id INT NULL COMMENT 'Reference to students table if user_type is student',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE SET NULL
);

-- User roles table (for faculty with multiple roles like HOD)
CREATE TABLE IF NOT EXISTS user_roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    role ENUM('faculty', 'hod') NOT NULL,
    department_id INT NULL COMMENT 'Department ID for HOD role',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_role_dept (user_id, role, department_id)
);

-- Indexes for authentication tables
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_users_faculty_id ON users(faculty_id);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);

