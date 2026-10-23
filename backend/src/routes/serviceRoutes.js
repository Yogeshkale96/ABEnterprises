const { Router } = require('express');
const serviceController = require('../controllers/serviceController');
const validateRequest = require('../middleware/validateRequest');
const { slugParam, listQuery } = require('../validators/productValidator');

const router = Router();

router.get('/categories', serviceController.listCategories);
router.get('/', validateRequest(listQuery), serviceController.list);
router.get('/:slug', validateRequest(slugParam), serviceController.getBySlug);

module.exports = router;
