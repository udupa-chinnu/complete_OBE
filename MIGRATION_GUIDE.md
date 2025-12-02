# Faculty Password Migration Guide

## Overview

This guide walks you through migrating existing faculty records to support password-based authentication. The migration script will:
1. ✅ Add `password_hash` column to the faculties table
2. ✅ Hash the default password `faculty123` using bcryptjs
3. ✅ Update ALL existing faculty records with the hashed password
4. ✅ Preserve all existing faculty data (no deletions)

## Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- npm or pnpm
- MySQL server running
- The backend dependencies installed

## Option A: Automated Migration (Recommended)

### Step 1: Run the Migration Script

```powershell
# Navigate to project root
cd c:\Users\LENOVO\Downloads\code

# Run the migration script
node migrate-faculty-passwords.js
```

### Expected Output

```
ℹ Database: sahyadri_obe @ localhost:3306
ℹ User: root
────────────────────────────────────────────────────────

✓ STEP 1: Schema Migration - Adding password_hash column
✓ Added password_hash column to faculties table
✓ Verified password_hash column exists
────────────────────────────────────────────────────────

✓ STEP 2: Fetching existing faculty records
✓ Found 5 faculty records without password_hash
────────────────────────────────────────────────────────

✓ STEP 3: Generating hashed password
ℹ Default password: faculty123
ℹ Hashing password with bcryptjs (10 rounds)...
✓ Password hashed successfully
────────────────────────────────────────────────────────

✓ STEP 4: Updating faculty records
ℹ Updating 5 faculty records...
ℹ [1/5] Updated: dr.john@sahyadri.edu.in
ℹ [2/5] Updated: ms.jane@sahyadri.edu.in
...
✓ Migration complete!
✓ Successfully updated: 5/5
────────────────────────────────────────────────────────
```

### Step 2: Verify in MySQL

Optionally, verify the migration in MySQL:

```sql
-- Check if password_hash column exists
DESCRIBE faculties;

-- View sample updated records
SELECT id, official_email, 
       SUBSTRING(password_hash, 1, 20) as hash_preview 
FROM faculties LIMIT 5;

-- Count total faculties with password_hash
SELECT COUNT(*) as total_with_password FROM faculties 
WHERE password_hash IS NOT NULL AND password_hash != '';
```

### Step 3: Restart Backend Server

```powershell
# Navigate to backend folder
cd c:\Users\LENOVO\Downloads\code\backend

# Kill any existing Node processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Start fresh
npm run dev
```

## Option B: Manual MySQL Migration

If you prefer to run SQL manually:

```sql
-- Step 1: Add password_hash column
ALTER TABLE faculties 
ADD COLUMN password_hash VARCHAR(255) AFTER profile_photo_path;

-- Verify it was added
DESCRIBE faculties;
```

Then run the Node.js script (which only handles updating the passwords):

```powershell
node migrate-faculty-passwords.js
```

## Option C: Custom Environment Variables

If your database credentials are different, pass them as environment variables:

```powershell
# On Windows PowerShell
$env:DB_HOST = "localhost"
$env:DB_USER = "admin"
$env:DB_PASSWORD = "your_password"
$env:DB_NAME = "sahyadri_obe"
$env:DB_PORT = "3306"

node migrate-faculty-passwords.js
```

Or in one line:

```powershell
$env:DB_USER="admin"; $env:DB_PASSWORD="pass123"; node migrate-faculty-passwords.js
```

## Faculty Login After Migration

Once migration is complete, faculty can login with:

| Field | Value |
|-------|-------|
| **Username** | official_email (e.g., `john.doe@sahyadri.edu.in`) |
| **Password** | `faculty123` |
| **Login URL** | `http://localhost:5000/api/auth/login` (or via UI) |

## What Happens in the Script

### 1. Schema Migration
- Checks if `password_hash` column exists in faculties table
- Adds it if missing (using `ALTER TABLE`)
- Verifies successful addition

### 2. Password Hashing
- Uses **bcryptjs** with 10 salt rounds (industry standard)
- Generates a secure hash of `faculty123`
- Hash is one-way encrypted (cannot be reversed)

### 3. Bulk Update
- Fetches all faculty records without password_hash
- Updates each record with the hashed password
- Provides progress feedback for each faculty

### 4. Verification
- Counts total faculties with password_hash set
- Shows sample of updated records
- Displays hash preview (not full hash for security)

## Troubleshooting

### Error: "connect ECONNREFUSED"
**Problem:** MySQL server is not running
**Solution:**
```powershell
# Start MySQL (if using XAMPP/local MySQL)
# Or check your MySQL service status
```

### Error: "Access denied for user 'root'@'localhost'"
**Problem:** Wrong database credentials
**Solution:**
```powershell
# Use correct credentials
$env:DB_USER = "your_username"
$env:DB_PASSWORD = "your_password"
node migrate-faculty-passwords.js
```

### Error: "Table 'sahyadri_obe.faculties' doesn't exist"
**Problem:** Wrong database name or database not set up
**Solution:**
```powershell
$env:DB_NAME = "correct_database_name"
node migrate-faculty-passwords.js
```

### No Output or Script Hangs
**Problem:** Waiting for MySQL connection
**Solution:**
- Ensure MySQL is running
- Check if port 3306 is accessible
- Try with explicit host/port:
```powershell
$env:DB_HOST = "127.0.0.1"
$env:DB_PORT = "3306"
node migrate-faculty-passwords.js
```

## Rollback (if needed)

If you need to rollback the password changes:

```sql
-- Reset all passwords to NULL (faculty cannot login until re-migrated)
UPDATE faculties SET password_hash = NULL;

-- OR remove the column entirely
ALTER TABLE faculties DROP COLUMN password_hash;
```

Then re-run the migration script.

## Next Steps

After successful migration:

1. ✅ Restart backend server (`npm run dev`)
2. ✅ Test faculty login with credentials
3. ✅ Test admin faculty create/edit flows
4. ✅ (Optional) Change default password for individual faculties
5. ✅ (Optional) Implement password reset functionality

## File Reference

- **Script:** `migrate-faculty-passwords.js`
- **Schema changes:** Adds `password_hash VARCHAR(255)` column
- **Default password:** `faculty123` (hashed with bcryptjs)
- **Affected tables:** `faculties` (data preserved)

---

**Last Updated:** December 2, 2025  
**Status:** Ready to use  
**Tested:** Yes
