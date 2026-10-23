const { pool } = require('../config/database');

const serviceRepository = {
  async listCategories() {
    const [rows] = await pool.query(
      `SELECT id, name, slug, description, icon, sort_order
       FROM service_categories WHERE status = 'published' ORDER BY sort_order, name`
    );
    return rows;
  },

  async list({ category, limit, offset } = {}) {
    const params = [];
    let sql = `SELECT s.id, s.name, s.slug, s.short_description, s.image_url, s.icon,
                      c.name AS category_name, c.slug AS category_slug
               FROM services s
               JOIN service_categories c ON c.id = s.category_id
               WHERE s.status = 'published'`;
    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }
    sql += ' ORDER BY c.sort_order, s.name LIMIT ? OFFSET ?';
    params.push(limit, offset);
    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async count({ category } = {}) {
    const params = [];
    let sql = `SELECT COUNT(*) AS total FROM services s
               JOIN service_categories c ON c.id = s.category_id
               WHERE s.status = 'published'`;
    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }
    const [[row]] = await pool.query(sql, params);
    return row.total;
  },

  async findBySlug(slug) {
    const [rows] = await pool.query(
      `SELECT s.id, s.name, s.slug, s.short_description, s.description, s.image_url, s.icon,
              c.name AS category_name, c.slug AS category_slug
       FROM services s
       JOIN service_categories c ON c.id = s.category_id
       WHERE s.slug = ? AND s.status = 'published'`,
      [slug]
    );
    return rows[0] || null;
  },

  async search(term, limit) {
    const like = `%${term}%`;
    const [rows] = await pool.query(
      `SELECT s.id, s.name, s.slug, s.short_description, 'service' AS type,
              c.name AS category_name
       FROM services s
       JOIN service_categories c ON c.id = s.category_id
       WHERE s.status = 'published' AND (s.name LIKE ? OR s.short_description LIKE ?)
       ORDER BY s.name LIMIT ?`,
      [like, like, limit]
    );
    return rows;
  },
};

module.exports = serviceRepository;
