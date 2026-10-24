const { Router } = require('express');
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const {
  updateStatusSchema,
  enquiryIdSchema,
  listEnquiriesSchema,
  addNoteSchema,
} = require('../validators/enquiryValidator');

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/stats', adminController.stats);
router.get('/enquiries', validateRequest(listEnquiriesSchema), adminController.listEnquiries);
router.get('/enquiries/:id', validateRequest(enquiryIdSchema), adminController.getEnquiry);
router.post('/enquiries/:id/notes', validateRequest(addNoteSchema), adminController.addEnquiryNote);
router.patch('/enquiries/:id/status', validateRequest(updateStatusSchema), adminController.updateEnquiryStatus);

module.exports = router;
