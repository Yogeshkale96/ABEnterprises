const asyncHandler = require('../utils/asyncHandler');
const productService = require('../services/productService');
const { parsePagination } = require('../utils/pagination');

const listCategories = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await productService.listCategories() });
});

const list = asyncHandler(async (req, res) => {
  const { category } = req.validatedQuery || {};
  const pagination = parsePagination(req.validatedQuery || {});
  res.json({ success: true, data: await productService.list({ category, ...pagination }) });
});

const getBySlug = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await productService.getBySlug(req.params.slug) });
});

module.exports = { listCategories, list, getBySlug };
