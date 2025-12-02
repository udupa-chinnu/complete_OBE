# Faculty Management - Schema Migration & Setup Guide

## 1. SCHEMA MIGRATION STEPS (Local Database)

### Step 1: Add Password Field to Faculties Table

Run this SQL query in your MySQL client:

```sql
-- Add password_hash column to faculties table
ALTER TABLE faculties ADD COLUMN password_hash VARCHAR(255) AFTER profile_photo_path;

-- Verify the column was added
DESCRIBE faculties;
```

### Step 2: Update Database & Restart Application

```powershell
# Navigate to backend folder
cd 'C:\Users\LENOVO\Downloads\code\backend'

# Stop any running processes
# Restart the backend server
npm run dev
```

## 2. DELETE ALL EXISTING FACULTIES (RESET DB)

Use this query to delete all faculties and related data:

```sql
-- Delete all faculties (cascades to related tables due to foreign keys)
DELETE FROM faculties;

-- OR if cascade is not working, delete in order:
-- First delete qualifications
DELETE FROM faculty_qualifications;

-- Then delete employment info
DELETE FROM faculty_employment;

-- Then delete additional details
DELETE FROM faculty_additional_details;

-- Finally delete faculties
DELETE FROM faculties;

-- Reset auto increment counter
ALTER TABLE faculties AUTO_INCREMENT = 1;
ALTER TABLE faculty_employment AUTO_INCREMENT = 1;
ALTER TABLE faculty_qualifications AUTO_INCREMENT = 1;
ALTER TABLE faculty_additional_details AUTO_INCREMENT = 1;

-- Verify tables are empty
SELECT COUNT(*) FROM faculties;
SELECT COUNT(*) FROM faculty_employment;
SELECT COUNT(*) FROM faculty_qualifications;
SELECT COUNT(*) FROM faculty_additional_details;
```

## 3. FACULTY LOGIN CREDENTIALS

When a faculty is created, the system automatically:
- Generates a hashed password from the default: **`faculty123`**
- Stores it in the `password_hash` field of the faculties table
- Faculty can login with their official email (username) and password: `faculty123`

Example:
- **Username:** john.doe@sahyadri.edu.in
- **Password:** faculty123

## 4. ADMIN UI CHANGES

### What Changed:
- **Removed tabs** (Personal, Qualification, Additional) - all fields now on one page
- **Added all fields from schema** including:
  - All personal details (height, contact, etc.)
  - Employment information (appointment, joining date, experience years, etc.)
  - Qualifications section (UG, PG, PhD, Post-Doc)
  - Additional details (bank info, PAN, Aadhar, marital status, research profiles, etc.)
- **Added prefetch on edit** - clicking Edit loads all faculty data automatically
- **Form submission** - creates FormData to handle file uploads + all fields at once

### File Used:
- `components/faculty-unified-form.tsx` - New unified form component

### How to Use in Admin Faculty Page:
```tsx
// In your page.tsx, replace the old form with:
import { FacultyUnifiedForm } from '@/components/faculty-unified-form'

// For adding faculty:
<FacultyUnifiedForm onSubmit={handleCreateFaculty} />

// For editing faculty (with prefetch):
<FacultyUnifiedForm 
  initialData={prefetchedFacultyData} 
  onSubmit={handleUpdateFaculty}
  isEditing={true}
/>
```

## 5. BACKEND API CHANGES

### Faculty Create (POST /api/faculties)
- Accepts all fields from unified form
- Automatically hashes password using bcryptjs
- Default password: `faculty123`
- Stores in `faculties.password_hash`
- Supports file uploads for profile photo
- Creates faculty_employment, faculty_qualifications, and faculty_additional_details records

### Faculty Update (PUT /api/faculties/:id)
- Accepts all fields from unified form
- Handles qualifications delete & recreate
- Updates employment and additional details
- Supports profile photo change

### Faculty Login (POST /api/auth/login)
- **New:** Check if username ends with `@sahyadri.edu.in`
- If yes, authenticate directly from `faculties` table using password_hash
- If no, fall back to `users` table
- Returns JWT token with faculty info

## 6. DATABASE SCHEMA UPDATES REQUIRED

Run this in MySQL to update your local database:

```sql
-- Check current faculties table structure
DESCRIBE faculties;

-- If password_hash column doesn't exist, add it
ALTER TABLE faculties ADD COLUMN password_hash VARCHAR(255) AFTER profile_photo_path;

-- Commit changes
COMMIT;
```

## 7. TESTING CHECKLIST

- [ ] Create a new faculty via admin panel - verify password_hash is stored
- [ ] Login with faculty email and `faculty123` password
- [ ] Edit faculty - verify all data is editable and saves correctly
- [ ] Delete/deactivate faculty - verify is_active = FALSE
- [ ] Check database - verify password_hash is hashed (not plain text)
- [ ] Try old faculty accounts - they should still work if they have password_hash

## 8. TROUBLESHOOTING

### Faculty can't login after creation
- Check if password_hash column exists: `DESCRIBE faculties;`
- Verify password is hashed in database: `SELECT official_email, password_hash FROM faculties WHERE official_email='your@email.com';`
- Ensure backend is restarted after code changes

### "Answers are required" error when submitting feedback
- This was fixed in student-portal feedback page - all fields should now submit correctly

### "Column password_hash doesn't exist" error
- Run the ALTER TABLE command above to add the column

## 9. NEXT STEPS (Optional Enhancements)

- [ ] Add password reset functionality
- [ ] Send login credentials via email when faculty is created
- [ ] Add faculty profile page in faculty-dashboard
- [ ] Add password change form for faculty
- [ ] Implement multi-factor authentication (MFA)

---

**Last Updated:** December 2, 2025
**Status:** Ready for implementation
