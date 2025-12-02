#!/usr/bin/env node

/**
 * Faculty Password Migration Script
 * 
 * This script:
 * 1. Adds password_hash column to faculties table (if not exists)
 * 2. Hashes the default password 'faculty123' for all existing faculties
 * 3. Updates all faculty records with the hashed password
 * 4. Provides detailed logging of the migration process
 * 
 * Usage: node migrate-faculty-passwords.js
 */

const mysql = require('mysql2/promise');
const bcryptjs = require('bcryptjs');
const path = require('path');

// Configuration
const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'sqlchinnu123',
  database: process.env.DB_NAME || 'education_portal',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
  separator: () => console.log(`${colors.dim}${'─'.repeat(60)}${colors.reset}`)
};

async function main() {
  let connection;

  try {
    log.header('Faculty Password Migration');
    log.info(`Database: ${config.database} @ ${config.host}:${config.port}`);
    log.info(`User: ${config.user}`);
    log.separator();

    // Create connection
    log.info('Connecting to database...');
    connection = await mysql.createConnection(config);
    log.success('Connected to database');
    log.separator();

    // Step 1: Add password_hash column if it doesn't exist
    log.header('STEP 1: Schema Migration - Adding password_hash column');

    try {
      await connection.execute(
        `ALTER TABLE faculties ADD COLUMN password_hash VARCHAR(255) AFTER profile_photo_path`
      );
      log.success('Added password_hash column to faculties table');
    } catch (error) {
      if (error.code === 'ER_DUP_FIELDNAME') {
        log.warning('password_hash column already exists, skipping add');
      } else {
        throw error;
      }
    }

    // Verify column exists
    const [columns] = await connection.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_NAME='faculties' AND TABLE_SCHEMA=? AND COLUMN_NAME='password_hash'`,
      [config.database]
    );

    if (columns.length === 0) {
      throw new Error('Failed to add or verify password_hash column');
    }

    log.success('Verified password_hash column exists');
    log.separator();

    // Step 2: Get all faculties without password_hash
    log.header('STEP 2: Fetching existing faculty records');

    const [faculties] = await connection.execute(
      `SELECT id, official_email FROM faculties WHERE password_hash IS NULL OR password_hash = ''`
    );

    log.success(`Found ${faculties.length} faculty records without password_hash`);

    if (faculties.length === 0) {
      log.warning('All faculty records already have password_hash set');
      log.info('Migration complete. No updates needed.');
      process.exit(0);
    }

    log.separator();

    // Step 3: Hash the default password
    log.header('STEP 3: Generating hashed password');

    const defaultPassword = 'faculty123';
    log.info(`Default password: ${defaultPassword}`);
    log.info('Hashing password with bcryptjs (10 rounds)...');

    const passwordHash = await bcryptjs.hash(defaultPassword, 10);
    log.success('Password hashed successfully');
    log.info(`Hash: ${passwordHash.substring(0, 30)}...`);
    log.separator();

    // Step 4: Update all faculties with hashed password
    log.header('STEP 4: Updating faculty records');

    log.info(`Updating ${faculties.length} faculty records...`);
    let successCount = 0;
    let failureCount = 0;

    for (const faculty of faculties) {
      try {
        await connection.execute(
          `UPDATE faculties SET password_hash = ? WHERE id = ?`,
          [passwordHash, faculty.id]
        );
        log.info(`  [${successCount + 1}/${faculties.length}] Updated: ${faculty.official_email || `ID: ${faculty.id}`}`);
        successCount++;
      } catch (error) {
        log.error(`  Failed to update ID ${faculty.id}: ${error.message}`);
        failureCount++;
      }
    }

    log.separator();
    log.success(`Migration complete!`);
    log.info(`Successfully updated: ${successCount}/${faculties.length}`);

    if (failureCount > 0) {
      log.warning(`Failed to update: ${failureCount}/${faculties.length}`);
    }

    // Step 5: Verification
    log.header('STEP 5: Verification');

    const [updatedFaculties] = await connection.execute(
      `SELECT COUNT(*) as count FROM faculties WHERE password_hash IS NOT NULL AND password_hash != ''`
    );

    const totalFaculties = updatedFaculties[0].count;
    log.success(`Total faculty with password_hash: ${totalFaculties}`);

    // Show sample of updated records
    const [sampleFaculties] = await connection.execute(
      `SELECT id, official_email, password_hash FROM faculties WHERE password_hash IS NOT NULL LIMIT 3`
    );

    if (sampleFaculties.length > 0) {
      log.info('Sample updated records:');
      sampleFaculties.forEach((faculty, index) => {
        const hashPreview = faculty.password_hash.substring(0, 20) + '...';
        log.info(`  [${index + 1}] ${faculty.official_email || `ID: ${faculty.id}`}: ${hashPreview}`);
      });
    }

    log.separator();
    log.header('✓ Migration Successful!');

    console.log(`\n${colors.bright}Next Steps:${colors.reset}`);
    console.log('1. Restart the backend server:');
    console.log('   cd backend && npm run dev\n');
    console.log('2. Faculty can now login with:');
    console.log('   Username: email@sahyadri.edu.in');
    console.log('   Password: faculty123\n');
    console.log('3. Go to: http://localhost:3000/admin/faculty\n');

  } catch (error) {
    log.error(`Migration failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      log.info('Database connection closed');
    }
  }
}

// Run the migration
main().catch((error) => {
  log.error(`Unexpected error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
