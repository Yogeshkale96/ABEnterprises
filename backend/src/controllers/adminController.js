const asyncHandler = require('../utils/asyncHandler');
const enquiryService = require('../services/enquiryService');
const { parsePagination } = require('../utils/pagination');

const stats = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await enquiryService.stats() });
});

const listEnquiries = asyncHandler(async (req, res) => {
  const q = req.validatedQuery || req.query;
  const pagination = parsePagination(q, { defaultLimit: 20 });
  const filters = {
    status: q.status,
    type: q.type,
    search: q.search,
    from: q.from,
    to: q.to,
    ...pagination,
  };
  res.json({ success: true, data: await enquiryService.list(filters) });
});

const getEnquiry = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await enquiryService.detail(req.params.id) });
});

const addEnquiryNote = asyncHandler(async (req, res) => {
  const note = await enquiryService.addNote(req.params.id, req.body.note, req.user?.name);
  res.status(201).json({ success: true, data: note });
});

const updateEnquiryStatus = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: await enquiryService.updateStatus(req.params.id, req.body.status),
  });
});

module.exports = { stats, listEnquiries, getEnquiry, addEnquiryNote, updateEnquiryStatus };
