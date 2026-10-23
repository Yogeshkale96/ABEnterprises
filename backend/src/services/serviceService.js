const AppError = require('../utils/AppError');
const serviceRepository = require('../repositories/serviceRepository');

const serviceService = {
  listCategories: () => serviceRepository.listCategories(),

  async list({ category, page, limit, offset }) {
    const [items, total] = await Promise.all([
      serviceRepository.list({ category, limit, offset }),
      serviceRepository.count({ category }),
    ]);
    return { items, total, page, limit };
  },

  async getBySlug(slug) {
    const service = await serviceRepository.findBySlug(slug);
    if (!service) throw new AppError('Service not found', 404, 'NOT_FOUND');
    return service;
  },
};

module.exports = serviceService;
