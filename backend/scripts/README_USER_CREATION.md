# User Creation Scripts

This directory contains scripts to create users for different roles in the system.

## Available Scripts

### 1. Create Admin User
```bash
node backend/scripts/create-admin.js
```
- **Username:** `admin`
- **Email:** `admin@test.com`
- **Password:** `test123`
- **Redirects to:** `/admin/dashboard`

### 2. Create Academic User
```bash
node backend/scripts/create-academic.js
```
- **Username:** `academic`
- **Email:** `academic@test.com`
- **Password:** `academic123`
- **Redirects to:** `/academicSWO/dashboard`

### 3. Create Faculty User
```bash
node backend/scripts/create-faculty-user.js
```
- **Username:** `faculty`
- **Email:** `faculty@test.com`
- **Password:** `faculty123`
- **Redirects to:** `/dashboard` (for role selection)
- **Note:** Requires at least one active faculty in the `faculties` table
- **Default Role:** Automatically assigned "faculty" role
- **HOD Role:** Can be assigned separately via admin panel or API

### 4. Create Student User
```bash
node backend/scripts/create-student.js
```
- **Username:** `student`
- **Email:** `student@test.com`
- **Password:** `student123`
- **Redirects to:** `/student-portal`

## Faculty Role Selection

When a faculty user logs in:
1. They are redirected to `/dashboard` for role selection
2. All faculty users have the "faculty" role by default
3. Only HODs (Head of Department) have both "faculty" and "hod" roles
4. The role dropdown shows:
   - **Regular Faculty:** Only "Faculty" option
   - **HODs:** Both "Faculty" and "HOD" options

## Assigning HOD Role

To assign HOD role to a faculty user, use the API endpoint:
```
POST /api/auth/assign-role
Headers: Authorization: Bearer <admin_token>
Body: {
  "userId": <user_id>,
  "role": "hod",
  "departmentId": <department_id>
}
```

Or use the admin panel (if implemented).

## Notes

- All passwords are hashed using bcrypt
- Users are created with `is_active = TRUE` by default
- Faculty users must be linked to an existing faculty record via `faculty_id`
- Student users can be linked to a student record via `student_id` (when students table is created)

