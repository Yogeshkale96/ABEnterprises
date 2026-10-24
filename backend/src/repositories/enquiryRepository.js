const { pool } = require('../config/database');

/** Shared WHERE builder for list/count filters. */
function buildFilters({ status, type, search, from, to } = {}) {
  const clauses = [];
  const params = [];
  if (status) {
    clauses.push('status = ?');
    params.push(status);
  }
  if (type) {
    clauses.push('type = ?');
    params.push(type);
  }
  if (search) {
    const like = `%${search}%`;
    clauses.push('(name LIKE ? OR email LIKE ? OR phone LIKE ? OR company LIKE ? OR subject LIKE ?)');
    params.push(like, like, like, like, like);
  }
  if (from) {
    clauses.push('created_at >= ?');
    params.push(`${from} 00:00:00`);
  }
  if (to) {
    clauses.push('created_at <= ?');
    params.push(`${to} 23:59:59`);
  }
  return { where: clauses.length ? ` WHERE ${clauses.join(' AND ')}` : '', params };
}

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

  async list(filters = {}) {
    const { limit, offset } = filters;
    const { where, params } = buildFilters(filters);
    const [rows] = await pool.query(
      `SELECT id, type, name, email, phone, company, subject, message, status, created_at
       FROM enquiries${where}
       ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    return rows;
  },

  async count(filters = {}) {
    const { where, params } = buildFilters(filters);
    const [[row]] = await pool.query(
      `SELECT COUNT(*) AS total FROM enquiries${where}`,
      params
    );
    return row.total;
  },

  async findById(id) {
    const [rows] = await pool.query(
      `SELECT id, type, name, email, phone, company, subject, message, status, ip_address, created_at, updated_at
       FROM enquiries WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  /** Line items for a quote, resolved to service/product names when possible. */
  async findItems(enquiryId) {
    const [rows] = await pool.query(
      `SELECT ei.item_type AS itemType, ei.item_id AS itemId, ei.quantity,
              COALESCE(s.name, p.name) AS item_name
       FROM enquiry_items ei
       LEFT JOIN services s ON ei.item_type = 'service' AND s.id = ei.item_id
       LEFT JOIN products p ON ei.item_type = 'product' AND p.id = ei.item_id
       WHERE ei.enquiry_id = ?
       ORDER BY ei.id`,
      [enquiryId]
    );
    return rows;
  },

  async listNotes(enquiryId) {
    const [rows] = await pool.query(
      `SELECT id, note, author, created_at FROM enquiry_notes
       WHERE enquiry_id = ? ORDER BY created_at DESC`,
      [enquiryId]
    );
    return rows;
  },

  async addNote(enquiryId, note, author) {
    const [result] = await pool.query(
      `INSERT INTO enquiry_notes (enquiry_id, note, author) VALUES (?, ?, ?)`,
      [enquiryId, note, author || null]
    );
    return result.insertId;
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
              SUM(status = 'resolved') AS resolved_count,
              SUM(status = 'closed') AS closed_count,
              SUM(type = 'contact') AS contact_count,
              SUM(type = 'quote') AS quote_count,
              SUM(type = 'amc') AS amc_count,
              SUM(created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) AS last_30_days
       FROM enquiries`
    );
    return row;
  },
};

module.exports = enquiryRepository;
