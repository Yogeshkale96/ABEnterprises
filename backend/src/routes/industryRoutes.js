const { Router } = require('express');
const industryController = require('../controllers/industryController');
const validateRequest = require('../middleware/validateRequest');
const { slugParam } = require('../validators/productValidator');

const router = Router();

router.get('/', industryController.list);
router.get('/:slug', validateRequest(slugParam), industryController.getBySlug);

module.exports = router;
