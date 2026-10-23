const asyncHandler = require('../utils/asyncHandler');
const industryRepository = require('../repositories/industryRepository');
const AppError = require('../utils/AppError');

const list = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await industryRepository.list() });
});

const getBySlug = asyncHandler(async (req, res) => {
  const industry = await industryRepository.findBySlug(req.params.slug);
  if (!industry) throw new AppError('Industry not found', 404, 'NOT_FOUND');
  res.json({ success: true, data: industry });
});

module.exports = { list, getBySlug };
