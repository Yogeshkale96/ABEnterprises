const { Router } = require('express');
const enquiryController = require('../controllers/enquiryController');
const validateRequest = require('../middleware/validateRequest');
const { formLimiter } = require('../middleware/rateLimiter');
const { enquirySchema } = require('../validators/enquiryValidator');

const router = Router();

router.post('/', formLimiter, validateRequest(enquirySchema), enquiryController.submit);

module.exports = router;
