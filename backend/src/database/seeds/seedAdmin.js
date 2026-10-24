/**
 * Idempotent admin-account seed.
 * Creates (or updates) the administrator from environment variables only.
 *
 * Required env vars:
 *   SEED_ADMIN_NAME      Display name for the admin user
 *   SEED_ADMIN_EMAIL     Login email
 *   SEED_ADMIN_PASSWORD  Plain-text password (hashed with bcrypt, never stored)
 * Optional:
 *   SEED_ADMIN_UPDATE_PASSWORD=1  Re-hash and update the password when the
 *                                 account already exists (skipped by default).
 *
 * Usage: npm run seed:admin
 */
const path = require('path');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '..', '.env') });

async function seedAdmin() {
  const { SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD } = process.env;
  const missing = ['SEED_ADMIN_NAME', 'SEED_ADMIN_EMAIL', 'SEED_ADMIN_PASSWORD']
    .filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`[seed:admin] Missing required env vars: ${missing.join(', ')}`);
    console.error('Set them in backend/.env and re-run. Aborting without changes.');
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ab_enterprises',
  });

  try {
    // Ensure the admin role exists before referencing it.
    await connection.query("INSERT IGNORE INTO roles (name) VALUES ('admin')");

    const [[role]] = await connection.query('SELECT id FROM roles WHERE name = ?', ['admin']);
    if (!role) throw new Error('Could not resolve the admin role.');

    const [[existing]] = await connection.query(
      'SELECT id FROM users WHERE email = ?',
      [SEED_ADMIN_EMAIL]
    );

    if (!existing) {
      const hash = await bcrypt.hash(SEED_ADMIN_PASSWORD, 12);
      await connection.query(
        `INSERT INTO users (name, email, password_hash, role_id, status)
         VALUES (?, ?, ?, ?, 'active')`,
        [SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, hash, role.id]
      );
      console.log(`[seed:admin] Created admin account: ${SEED_ADMIN_EMAIL}`);
    } else if (process.env.SEED_ADMIN_UPDATE_PASSWORD === '1') {
      const hash = await bcrypt.hash(SEED_ADMIN_PASSWORD, 12);
      await connection.query(
        'UPDATE users SET name = ?, password_hash = ?, role_id = ?, status = \'active\' WHERE id = ?',
        [SEED_ADMIN_NAME, hash, role.id, existing.id]
      );
      console.log(`[seed:admin] Admin already existed — name/role synced and password updated: ${SEED_ADMIN_EMAIL}`);
    } else {
      await connection.query(
        'UPDATE users SET name = ?, role_id = ? WHERE id = ?',
        [SEED_ADMIN_NAME, role.id, existing.id]
      );
      console.log(`[seed:admin] Admin already exists — name/role synced, password left unchanged: ${SEED_ADMIN_EMAIL}`);
    }

    console.log('[seed:admin] Done.');
  } finally {
    await connection.end();
  }
}

seedAdmin().catch((err) => {
  console.error('[seed:admin] Failed:', err.message);
  process.exit(1);
});
