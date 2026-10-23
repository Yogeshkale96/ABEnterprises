const { Router } = require('express');
const searchController = require('../controllers/searchController');
const validateRequest = require('../middleware/validateRequest');
const { searchLimiter } = require('../middleware/rateLimiter');
const { suggestionsSchema, searchSchema } = require('../validators/searchValidator');

const router = Router();

router.get('/suggestions', searchLimiter, validateRequest(suggestionsSchema), searchController.suggestions);
router.get('/popular', searchLimiter, searchController.popular);
router.get('/', searchLimiter, validateRequest(searchSchema), searchController.search);

module.exports = router;
