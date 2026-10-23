import apiClient from './apiClient.js'

const productService = {
  listCategories: () => apiClient.get('/products/categories').then((r) => r.data),
  list: (params = {}) => apiClient.get('/products', { params }).then((r) => r.data),
  getBySlug: (slug) => apiClient.get(`/products/${slug}`).then((r) => r.data),
}

export default productService
