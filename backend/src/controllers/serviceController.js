const asyncHandler = require('../utils/asyncHandler');
const serviceService = require('../services/serviceService');
const { parsePagination } = require('../utils/pagination');

const listCategories = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await serviceService.listCategories() });
});

const list = asyncHandler(async (req, res) => {
  const { category } = req.validatedQuery || {};
  const pagination = parsePagination(req.validatedQuery || {});
  res.json({ success: true, data: await serviceService.list({ category, ...pagination }) });
});

const getBySlug = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await serviceService.getBySlug(req.params.slug) });
});

module.exports = { listCategories, list, getBySlug };
