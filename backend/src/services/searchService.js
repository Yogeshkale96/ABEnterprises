const productRepository = require('../repositories/productRepository');
const serviceRepository = require('../repositories/serviceRepository');

const POPULAR_SEARCHES = [
  'laptops', 'cctv camera', 'printer', 'amc', 'ups battery',
  'networking', 'website development', 'desktop',
];

const searchService = {
  async suggestions(q, limit = 5) {
    const [products, services] = await Promise.all([
      productRepository.search(q, limit),
      serviceRepository.search(q, limit),
    ]);
    const popular = POPULAR_SEARCHES.filter((p) => p.includes(q.toLowerCase())).slice(0, 3);
    return { products, services, popular };
  },

  async popular() {
    return POPULAR_SEARCHES;
  },

  async search(q, type, { limit, offset } = {}) {
    const wantsProducts = type === 'all' || type === 'products';
    const wantsServices = type === 'all' || type === 'services';
    const perType = type === 'all' ? Math.ceil(limit / 2) : limit;

    const [products, services] = await Promise.all([
      wantsProducts ? productRepository.search(q, perType) : Promise.resolve([]),
      wantsServices ? serviceRepository.search(q, perType) : Promise.resolve([]),
    ]);
    return { products, services, query: q, type };
  },
};

module.exports = searchService;
