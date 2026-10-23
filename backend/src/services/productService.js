const AppError = require('../utils/AppError');
const productRepository = require('../repositories/productRepository');

const productService = {
  listCategories: () => productRepository.listCategories(),

  async list({ category, page, limit, offset }) {
    const [items, total] = await Promise.all([
      productRepository.list({ category, limit, offset }),
      productRepository.count({ category }),
    ]);
    return { items, total, page, limit };
  },

  async getBySlug(slug) {
    const product = await productRepository.findBySlug(slug);
    if (!product) throw new AppError('Product not found', 404, 'NOT_FOUND');
    return product;
  },
};

module.exports = productService;
