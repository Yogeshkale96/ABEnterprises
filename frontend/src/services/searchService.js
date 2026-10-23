import apiClient from './apiClient.js'

const searchService = {
  suggestions: (q, signal) =>
    apiClient.get('/search/suggestions', { params: { q }, signal }).then((r) => r.data),
  popular: () => apiClient.get('/search/popular').then((r) => r.data),
  search: (q, type = 'all', page = 1) =>
    apiClient.get('/search', { params: { q, type, page } }).then((r) => r.data),
}

export default searchService
