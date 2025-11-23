# Authentication Setup Guide

## Creating Admin User

The password must be hashed with bcrypt. You cannot insert a plain text password.

### Option 1: Using the Script (Recommended)

1. Make sure your `.env` file is configured with database credentials
2. Run the script:
```bash
cd backend
npm run create-admin
```

This will:
- Create admin user with username: `admin`
- Email: `admin@test.com`
- Password: `test123`
- User Type: `admin`

### Option 2: Manual SQL (if script doesn't work)

1. Generate password hash using Node.js:
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('test123', 10).then(hash => console.log(hash));"
```

2. Copy the generated hash and use it in SQL:
```sql
INSERT INTO users (username, email, password_hash, user_type, is_active)
VALUES (
  'admin',
  'admin@test.com',
  '<paste-generated-hash-here>',
  'admin',
  TRUE
)
ON DUPLICATE KEY UPDATE
  password_hash = '<paste-generated-hash-here>',
  is_active = TRUE;
```

### Option 3: Update Existing User

If you already inserted the user with wrong password:

```sql
-- First, generate hash using the script or Node.js command above
-- Then update:
UPDATE users 
SET password_hash = '<paste-generated-hash-here>'
WHERE username = 'admin' OR email = 'admin@test.com';
```

## Testing Login

After creating the admin user, test login with:
- Username: `admin` or `admin@test.com`
- Password: `test123`

## Troubleshooting

### Error: "Invalid credentials"
- Check if password_hash in database is a valid bcrypt hash (starts with `$2a$10$`)
- Verify the user exists: `SELECT * FROM users WHERE username = 'admin';`
- Check if user is active: `SELECT is_active FROM users WHERE username = 'admin';`

### Error: "User not found"
- Verify user exists in database
- Check username/email spelling
- Ensure `is_active = TRUE`

