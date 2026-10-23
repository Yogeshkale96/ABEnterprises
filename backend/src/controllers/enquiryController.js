const asyncHandler = require('../utils/asyncHandler');
const enquiryService = require('../services/enquiryService');

const submit = asyncHandler(async (req, res) => {
  // Honeypot: silently accept but discard bot submissions.
  if (req.body.website) return res.status(202).json({ success: true });
  const { id } = await enquiryService.submit(req.body, req.ip);
  res.status(201).json({ success: true, data: { id }, message: 'Your enquiry has been received.' });
});

module.exports = { submit };
