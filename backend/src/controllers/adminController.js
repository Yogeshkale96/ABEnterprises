const asyncHandler = require('../utils/asyncHandler');
const enquiryService = require('../services/enquiryService');
const { parsePagination } = require('../utils/pagination');

const stats = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await enquiryService.stats() });
});

const listEnquiries = asyncHandler(async (req, res) => {
  const status = req.query.status;
  const pagination = parsePagination(req.query, { defaultLimit: 20 });
  res.json({ success: true, data: await enquiryService.list({ status, ...pagination }) });
});

const updateEnquiryStatus = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: await enquiryService.updateStatus(req.params.id, req.body.status),
  });
});

module.exports = { stats, listEnquiries, updateEnquiryStatus };
