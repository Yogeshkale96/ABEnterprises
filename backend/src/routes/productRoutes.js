const { Router } = require('express');
const productController = require('../controllers/productController');
const validateRequest = require('../middleware/validateRequest');
const { slugParam, listQuery } = require('../validators/productValidator');

const router = Router();

router.get('/categories', productController.listCategories);
router.get('/', validateRequest(listQuery), productController.list);
router.get('/:slug', validateRequest(slugParam), productController.getBySlug);

module.exports = router;
