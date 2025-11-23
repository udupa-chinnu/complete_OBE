-- SQL script to create/update admin user with bcrypt hashed password
-- Password: test123
-- Hash generated with bcrypt (10 rounds)

-- Option 1: Insert new admin user (if doesn't exist)
INSERT INTO users (username, email, password_hash, user_type, is_active)
VALUES (
  'admin',
  'admin@test.com',
  '$2a$10$rOzJqJqJqJqJqJqJqJqJqOeJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq', -- This is a placeholder, use the script instead
  'admin',
  TRUE
)
ON DUPLICATE KEY UPDATE
  password_hash = VALUES(password_hash),
  is_active = TRUE;

-- Note: The hash above is a placeholder. 
-- Use the create-admin.js script to generate the correct hash.

