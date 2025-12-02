-- Faculty Management Database Migration Script
-- Run this in MySQL Workbench or mysql CLI
-- This script handles:
-- 1. Add password_hash column to faculties table
-- 2. Clean up existing faculty data
-- 3. Reset auto-increment counters

-- ============================================
-- STEP 1: Add password_hash column
-- ============================================
-- This is safe to run multiple times (will silently fail if column exists)

ALTER TABLE faculties ADD COLUMN password_hash VARCHAR(255) AFTER profile_photo_path;

-- Verify the column was added
DESCRIBE faculties;

-- ============================================
-- STEP 2: Clean up existing faculty data
-- ============================================
-- WARNING: This will delete all faculty records!
-- Comment out this section if you want to keep existing data

-- Delete all related records in order
DELETE FROM faculty_qualifications;
DELETE FROM faculty_employment;
DELETE FROM faculty_additional_details;
DELETE FROM faculties;

-- Reset auto-increment counters
ALTER TABLE faculties AUTO_INCREMENT = 1;
ALTER TABLE faculty_employment AUTO_INCREMENT = 1;
ALTER TABLE faculty_qualifications AUTO_INCREMENT = 1;
ALTER TABLE faculty_additional_details AUTO_INCREMENT = 1;

-- ============================================
-- STEP 3: Verify cleanup
-- ============================================
-- All these should return 0 if cleanup was successful

SELECT COUNT(*) as faculties_count FROM faculties;
SELECT COUNT(*) as employment_count FROM faculty_employment;
SELECT COUNT(*) as qualifications_count FROM faculty_qualifications;
SELECT COUNT(*) as additional_details_count FROM faculty_additional_details;

-- ============================================
-- STEP 4: Verify schema
-- ============================================
-- password_hash should appear in the column list

DESCRIBE faculties;

-- ============================================
-- Setup Complete!
-- ============================================
-- You can now:
-- 1. Restart backend: cd backend && npm run dev
-- 2. Go to http://localhost:3000/admin/faculty
-- 3. Create new faculty (default password: faculty123)
-- 4. Faculty login: email@sahyadri.edu.in / faculty123
