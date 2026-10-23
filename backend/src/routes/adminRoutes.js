const { Router } = require('express');
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validateRequest = require('../middleware/validateRequest');
const { updateStatusSchema } = require('../validators/enquiryValidator');

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/stats', adminController.stats);
router.get('/enquiries', adminController.listEnquiries);
router.patch('/enquiries/:id/status', validateRequest(updateStatusSchema), adminController.updateEnquiryStatus);

module.exports = router;
