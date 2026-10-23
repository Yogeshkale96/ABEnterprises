const asyncHandler = require('../utils/asyncHandler');
const searchService = require('../services/searchService');
const { parsePagination } = require('../utils/pagination');

const suggestions = asyncHandler(async (req, res) => {
  const data = await searchService.suggestions(req.validatedQuery.q);
  res.json({ success: true, data });
});

const popular = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await searchService.popular() });
});

const search = asyncHandler(async (req, res) => {
  const { q, type } = req.validatedQuery;
  const pagination = parsePagination(req.validatedQuery, { defaultLimit: 20 });
  const data = await searchService.search(q, type, pagination);
  res.json({ success: true, data });
});

module.exports = { suggestions, popular, search };
