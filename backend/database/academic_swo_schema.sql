-- ============================================
-- ACADEMIC SWO (Student Welfare & Outcome) 
-- FEEDBACK MANAGEMENT SYSTEM
-- ============================================
-- Database: education_portal
-- Tables follow 3NF normalization

-- ============================================
-- FEEDBACK FORMS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS academic_feedback_forms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    form_type ENUM('faculty_feedback', 'institution_feedback', 'graduate_exit_survey') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department_id INT,
    semester_id INT,
    batch_id INT,
    status ENUM('Active', 'Inactive', 'Draft') DEFAULT 'Draft',
    created_by INT NOT NULL,
    is_mandatory BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_form_type (form_type),
    INDEX idx_status (status),
    INDEX idx_department_id (department_id),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- FEEDBACK AREAS/SECTIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS academic_feedback_areas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    form_id INT NOT NULL,
    area_name VARCHAR(255) NOT NULL,
    area_description TEXT,
    sort_order INT DEFAULT 0,
    is_mandatory BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES academic_feedback_forms(id) ON DELETE CASCADE,
    UNIQUE KEY unique_form_area (form_id, area_name),
    INDEX idx_form_id (form_id),
    INDEX idx_sort_order (sort_order)
);

-- ============================================
-- FEEDBACK QUESTIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS academic_feedback_questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    form_id INT NOT NULL,
    area_id INT,
    question_text VARCHAR(500) NOT NULL,
    question_type ENUM('text', 'textarea', 'rating', 'multiple_choice', 'yes_no') DEFAULT 'rating',
    sort_order INT DEFAULT 0,
    is_mandatory BOOLEAN DEFAULT TRUE,
    scale_min INT COMMENT 'For rating type: minimum value',
    scale_max INT COMMENT 'For rating type: maximum value',
    scale_min_label VARCHAR(100) COMMENT 'Label for minimum rating',
    scale_max_label VARCHAR(100) COMMENT 'Label for maximum rating',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES academic_feedback_forms(id) ON DELETE CASCADE,
    FOREIGN KEY (area_id) REFERENCES academic_feedback_areas(id) ON DELETE SET NULL,
    INDEX idx_form_id (form_id),
    INDEX idx_area_id (area_id),
    INDEX idx_sort_order (sort_order)
);

-- ============================================
-- QUESTION OPTIONS TABLE (for multiple choice)
-- ============================================

CREATE TABLE IF NOT EXISTS academic_question_options (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT NOT NULL,
    option_text VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES academic_feedback_questions(id) ON DELETE CASCADE,
    INDEX idx_question_id (question_id),
    INDEX idx_sort_order (sort_order)
);

-- ============================================
-- FEEDBACK RESPONSES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS academic_feedback_responses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    form_id INT NOT NULL,
    respondent_user_id INT NOT NULL,
    respondent_type ENUM('faculty', 'student', 'graduate', 'institution_stakeholder') NOT NULL,
    faculty_id INT COMMENT 'Faculty being evaluated (for faculty feedback)',
    subject_id INT COMMENT 'Subject/Course being evaluated',
    semester_id INT,
    batch_year VARCHAR(20) COMMENT 'Batch year for graduate exit survey',
    response_status ENUM('Started', 'InProgress', 'Completed', 'Submitted') DEFAULT 'Started',
    ip_address VARCHAR(45),
    user_agent TEXT,
    start_time DATETIME,
    submitted_time DATETIME,
    completion_time_minutes INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES academic_feedback_forms(id) ON DELETE RESTRICT,
    FOREIGN KEY (respondent_user_id) REFERENCES users(id) ON DELETE RESTRICT,
    FOREIGN KEY (faculty_id) REFERENCES faculties(id) ON DELETE SET NULL,
    INDEX idx_form_id (form_id),
    INDEX idx_respondent_user_id (respondent_user_id),
    INDEX idx_response_status (response_status),
    INDEX idx_faculty_id (faculty_id),
    INDEX idx_submitted_time (submitted_time)
);

-- ============================================
-- INDIVIDUAL ANSWERS/RESPONSES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS academic_answer_details (
    id INT PRIMARY KEY AUTO_INCREMENT,
    response_id INT NOT NULL,
    question_id INT NOT NULL,
    answer_text VARCHAR(500),
    answer_rating INT,
    answer_option_id INT,
    answer_timestamp DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (response_id) REFERENCES academic_feedback_responses(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES academic_feedback_questions(id) ON DELETE RESTRICT,
    FOREIGN KEY (answer_option_id) REFERENCES academic_question_options(id) ON DELETE SET NULL,
    INDEX idx_response_id (response_id),
    INDEX idx_question_id (question_id),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- FACULTY FEEDBACK SPECIFIC TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS academic_faculty_feedback_forms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    form_id INT NOT NULL UNIQUE,
    department_id INT NOT NULL,
    semester_id INT NOT NULL,
    course_id INT,
    target_faculty_ids TEXT COMMENT 'JSON array of faculty IDs',
    response_deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES academic_feedback_forms(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
    INDEX idx_department_id (department_id)
);

-- ============================================
-- INSTITUTION FEEDBACK SPECIFIC TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS academic_institution_feedback_forms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    form_id INT NOT NULL UNIQUE,
    semester_id INT NOT NULL,
    target_user_types TEXT COMMENT 'JSON array of user types: faculty, student, staff',
    response_deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES academic_feedback_forms(id) ON DELETE CASCADE,
    INDEX idx_semester_id (semester_id)
);

-- ============================================
-- GRADUATE EXIT SURVEY SPECIFIC TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS academic_graduate_exit_forms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    form_id INT NOT NULL UNIQUE,
    batch_start_year YEAR NOT NULL,
    batch_end_year YEAR NOT NULL,
    department_id INT,
    response_deadline DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES academic_feedback_forms(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    INDEX idx_batch (batch_start_year, batch_end_year)
);

-- ============================================
-- FEEDBACK REPORTS/ANALYTICS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS academic_feedback_reports (
    id INT PRIMARY KEY AUTO_INCREMENT,
    form_id INT NOT NULL,
    report_type ENUM('summary', 'detailed', 'comparative') DEFAULT 'summary',
    total_responses INT DEFAULT 0,
    completion_rate DECIMAL(5, 2) COMMENT 'Percentage of responses',
    average_rating DECIMAL(3, 2),
    question_id INT,
    average_answer_rating DECIMAL(3, 2),
    response_count_for_question INT,
    generated_by INT,
    generated_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES academic_feedback_forms(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES academic_feedback_questions(id) ON DELETE SET NULL,
    FOREIGN KEY (generated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_form_id (form_id),
    INDEX idx_generated_at (generated_at)
);

-- ============================================
-- AUDIT LOG FOR FEEDBACK OPERATIONS
-- ============================================

CREATE TABLE IF NOT EXISTS academic_feedback_audit_log (
    id INT PRIMARY KEY AUTO_INCREMENT,
    form_id INT,
    action VARCHAR(100) NOT NULL COMMENT 'create, update, delete, submit, download_report',
    action_by INT NOT NULL,
    action_details TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES academic_feedback_forms(id) ON DELETE SET NULL,
    FOREIGN KEY (action_by) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_form_id (form_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- REFERENCE TABLES (SUPPORTING DATA)
-- ============================================

CREATE TABLE IF NOT EXISTS academic_semesters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    semester_name VARCHAR(50) NOT NULL UNIQUE,
    academic_year VARCHAR(20) NOT NULL,
    semester_type ENUM('Odd', 'Even') NOT NULL,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_semester (academic_year, semester_type),
    INDEX idx_is_active (is_active)
);

CREATE TABLE IF NOT EXISTS academic_courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    department_id INT NOT NULL,
    semester_id INT,
    credits INT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
    FOREIGN KEY (semester_id) REFERENCES academic_semesters(id) ON DELETE SET NULL,
    UNIQUE KEY unique_course (course_code, department_id),
    INDEX idx_department_id (department_id)
);

CREATE TABLE IF NOT EXISTS academic_batches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    batch_name VARCHAR(50) NOT NULL,
    start_year YEAR NOT NULL,
    end_year YEAR NOT NULL,
    department_id INT,
    program_id INT,
    student_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE SET NULL,
    UNIQUE KEY unique_batch (batch_name, start_year),
    INDEX idx_is_active (is_active)
);

-- ============================================
-- INDEXES FOR OPTIMIZATION
-- ============================================

CREATE INDEX idx_academic_feedback_forms_form_type ON academic_feedback_forms(form_type);
CREATE INDEX idx_academic_feedback_forms_status ON academic_feedback_forms(status);
CREATE INDEX idx_academic_feedback_forms_department_id ON academic_feedback_forms(department_id);
CREATE INDEX idx_academic_feedback_responses_submitted_time ON academic_feedback_responses(submitted_time);
CREATE INDEX idx_academic_feedback_responses_form_id_status ON academic_feedback_responses(form_id, response_status);
CREATE INDEX idx_academic_answer_details_response_id_question_id ON academic_answer_details(response_id, question_id);
