import apiClient from './apiClient.js'

const serviceService = {
  listCategories: () => apiClient.get('/services/categories').then((r) => r.data),
  list: (params = {}) => apiClient.get('/services', { params }).then((r) => r.data),
  getBySlug: (slug) => apiClient.get(`/services/${slug}`).then((r) => r.data),
}

export default serviceService
