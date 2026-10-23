const { pool } = require('../config/database');

const userRepository = {
  async findByEmail(email) {
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.password_hash, u.status, r.name AS role
       FROM users u JOIN roles r ON r.id = u.role_id
       WHERE u.email = ?`,
      [email]
    );
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.status, r.name AS role
       FROM users u JOIN roles r ON r.id = u.role_id
       WHERE u.id = ?`,
      [id]
    );
    return rows[0] || null;
  },
};

module.exports = userRepository;
