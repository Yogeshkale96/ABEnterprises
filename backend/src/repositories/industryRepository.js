const { pool } = require('../config/database');

const industryRepository = {
  async list() {
    const [rows] = await pool.query(
      `SELECT id, name, slug, description, image_url, icon, sort_order
       FROM industries WHERE status = 'published' ORDER BY sort_order, name`
    );
    return rows;
  },

  async findBySlug(slug) {
    const [rows] = await pool.query(
      `SELECT id, name, slug, description, image_url, icon
       FROM industries WHERE slug = ? AND status = 'published'`,
      [slug]
    );
    return rows[0] || null;
  },
};

module.exports = industryRepository;
