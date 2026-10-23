const { pool } = require('../config/database');

const productRepository = {
  async listCategories() {
    const [rows] = await pool.query(
      `SELECT id, name, slug, description, image_url, icon, sort_order
       FROM product_categories WHERE status = 'published' ORDER BY sort_order, name`
    );
    return rows;
  },

  async list({ category, limit, offset } = {}) {
    const params = [];
    let sql = `SELECT p.id, p.name, p.slug, p.brand, p.short_description, p.description, p.price, p.image_url,
                      c.name AS category_name, c.slug AS category_slug
               FROM products p
               JOIN product_categories c ON c.id = p.category_id
               WHERE p.status = 'published'`;
    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }
    sql += ' ORDER BY c.sort_order, p.name LIMIT ? OFFSET ?';
    params.push(limit, offset);
    const [rows] = await pool.query(sql, params);
    return rows;
  },

  async count({ category } = {}) {
    const params = [];
    let sql = `SELECT COUNT(*) AS total FROM products p
               JOIN product_categories c ON c.id = p.category_id
               WHERE p.status = 'published'`;
    if (category) {
      sql += ' AND c.slug = ?';
      params.push(category);
    }
    const [[row]] = await pool.query(sql, params);
    return row.total;
  },

  async findBySlug(slug) {
    const [rows] = await pool.query(
      `SELECT p.id, p.name, p.slug, p.brand, p.short_description, p.description,
              p.price, p.image_url, c.name AS category_name, c.slug AS category_slug
       FROM products p
       JOIN product_categories c ON c.id = p.category_id
       WHERE p.slug = ? AND p.status = 'published'`,
      [slug]
    );
    return rows[0] || null;
  },

  async search(term, limit) {
    const like = `%${term}%`;
    const [rows] = await pool.query(
      `SELECT p.id, p.name, p.slug, p.short_description, p.price, 'product' AS type,
              c.name AS category_name
       FROM products p
       JOIN product_categories c ON c.id = p.category_id
       WHERE p.status = 'published' AND (p.name LIKE ? OR p.brand LIKE ? OR p.short_description LIKE ?)
       ORDER BY p.name LIMIT ?`,
      [like, like, like, limit]
    );
    return rows;
  },
};

module.exports = productRepository;
