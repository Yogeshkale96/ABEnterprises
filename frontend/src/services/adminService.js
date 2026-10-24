import apiClient from './apiClient.js'

/** Admin API calls — every endpoint requires an authenticated admin session. */
const adminService = {
  stats: () => apiClient.get('/admin/stats'),

  enquiries: ({ type, status, search, from, to, page = 1, limit = 20 } = {}) =>
    apiClient.get('/admin/enquiries', {
      params: {
        type: type || undefined,
        status: status || undefined,
        search: search || undefined,
        from: from || undefined,
        to: to || undefined,
        page,
        limit,
      },
    }),

  enquiry: (id) => apiClient.get(`/admin/enquiries/${id}`),

  updateStatus: (id, status) =>
    apiClient.patch(`/admin/enquiries/${id}/status`, { status }),

  addNote: (id, note) =>
    apiClient.post(`/admin/enquiries/${id}/notes`, { note }),
}

export default adminService
