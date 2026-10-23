const { pool } = require('../config/database');

const enquiryRepository = {
  async create({ type, name, email, phone, company, subject, message, ipAddress }) {
    const [result] = await pool.query(
      `INSERT INTO enquiries (type, name, email, phone, company, subject, message, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [type, name, email, phone, company || null, subject || null, message, ipAddress || null]
    );
    return result.insertId;
  },

  async addItems(enquiryId, items) {
    if (!items?.length) return;
    const values = items.map((i) => [enquiryId, i.itemType, i.itemId, i.quantity || 1]);
    await pool.query(
      `INSERT INTO enquiry_items (enquiry_id, item_type, item_id, quantity) VALUES ?`,
      [values]
    );
  },

  async list({ status, limit, offset } = {}) {
    const params = [];
    let sql = `SELECT id, type, name, email, phone, company, subject, message, status, created_at
               FROM enquiries`;
    if (status) {
      sql += ' WHERE status = ?';
      params.push(status);
    }
    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async count({ status } = {}) {
    const params = [];
    let sql = 'SELECT COUNT(*) AS total FROM enquiries';
    if (status) {
      sql += ' WHERE status = ?';
      params.push(status);
    }
    const [[row]] = await pool.query(sql, params);
    return row.total;
  },

  async updateStatus(id, status) {
    const [result] = await pool.query('UPDATE enquiries SET status = ? WHERE id = ?', [status, id]);
    return result.affectedRows > 0;
  },

  async stats() {
    const [[row]] = await pool.query(
      `SELECT COUNT(*) AS total,
              SUM(status = 'new') AS new_count,
              SUM(status = 'in_progress') AS in_progress_count,
              SUM(created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS last_30_days
       FROM enquiries`
    );
    return row;
  },
};

module.exports = enquiryRepository;
