const mysql = require('mysql2/promise');
const env = require('./env');
const logger = require('../utils/logger');

const pool = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  database: env.db.name,
  user: env.db.user,
  password: env.db.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: false,
});

async function checkConnection() {
  const conn = await pool.getConnection();
  try {
    await conn.ping();
    logger.info('MySQL connection pool ready');
  } finally {
    conn.release();
  }
}

module.exports = { pool, checkConnection };
