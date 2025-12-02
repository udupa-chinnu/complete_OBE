# Faculty Password Migration - Quick Start

## What This Does

✅ Adds `password_hash` column to the faculties table  
✅ Hashes default password `faculty123` using bcryptjs (10 rounds)  
✅ Updates ALL existing faculty records with hashed password  
✅ **Preserves all existing faculty data** (no deletions)  
✅ Provides detailed migration logs  

## Files Created

| File | Purpose |
|------|---------|
| `migrate-faculty-passwords.js` | Main Node.js migration script |
| `run-migration.ps1` | PowerShell automation wrapper |
| `MIGRATION_GUIDE.md` | Comprehensive setup documentation |
| `setup-faculty-db.sql` | SQL-only option (alternative) |

## Quick Start (3 Steps)

### Step 1: Run Migration
```powershell
cd c:\Users\LENOVO\Downloads\code
node migrate-faculty-passwords.js
```

### Step 2: Verify Output
You should see:
```
✓ Added password_hash column
✓ Found X faculty records without password_hash
✓ Password hashed successfully
✓ Successfully updated: X/X
```

### Step 3: Restart Backend
```powershell
cd c:\Users\LENOVO\Downloads\code\backend
npm run dev
```

## Automated Option (Recommended)

```powershell
cd c:\Users\LENOVO\Downloads\code
.\run-migration.ps1
```

This automatically:
- ✅ Checks Node.js
- ✅ Runs migration
- ✅ Restarts backend
- ✅ Shows summary

## What Happens

### The Script:

1. **Connects to MySQL**
   - Uses credentials: `root:root @ localhost:3306`
   - Database: `sahyadri_obe`

2. **Adds Column** (if missing)
   ```sql
   ALTER TABLE faculties ADD COLUMN password_hash VARCHAR(255) AFTER profile_photo_path
   ```

3. **Hashes Password**
   - Input: `faculty123`
   - Algorithm: bcryptjs (10 salt rounds)
   - Output: Secure one-way encrypted hash

4. **Updates Faculty Records**
   ```sql
   UPDATE faculties SET password_hash = ? WHERE id = ?
   ```

5. **Verifies Migration**
   - Shows updated count
   - Displays sample records
   - All data preserved ✓

## Faculty Login After Migration

| Field | Value |
|-------|-------|
| **Username** | official_email (e.g., `john.doe@sahyadri.edu.in`) |
| **Password** | `faculty123` |
| **Login URL** | `http://localhost:3000` (admin portal) |

## Environment Variables (Optional)

If your database credentials differ:

```powershell
$env:DB_HOST = "localhost"
$env:DB_USER = "admin"
$env:DB_PASSWORD = "yourpassword"
$env:DB_NAME = "sahyadri_obe"
$env:DB_PORT = "3306"

node migrate-faculty-passwords.js
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "connect ECONNREFUSED" | Start MySQL server |
| "Access denied" | Check DB credentials, set env vars |
| "Table doesn't exist" | Check DB name with `$env:DB_NAME` |
| No output | Wait 5-10 seconds for MySQL connection |

## Rollback (if needed)

If you need to undo:

```sql
-- Option 1: Clear hashes (faculty cannot login)
UPDATE faculties SET password_hash = NULL;

-- Option 2: Remove column entirely
ALTER TABLE faculties DROP COLUMN password_hash;
```

Then re-run migration.

## After Migration

1. ✅ Restart backend: `npm run dev`
2. ✅ Test faculty login with credentials
3. ✅ Test admin faculty create/edit
4. ✅ (Optional) Change password for specific faculty
5. ✅ (Optional) Add password reset feature

## Support

For detailed instructions, see: **MIGRATION_GUIDE.md**

---

**Status:** ✅ Ready to use  
**Tested:** Yes  
**Data Loss Risk:** None (preserves all existing data)  
**Time Required:** 1-5 minutes  
