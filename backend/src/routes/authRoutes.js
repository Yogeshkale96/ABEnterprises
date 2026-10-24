const { Router } = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const validateRequest = require('../middleware/validateRequest');
const { authLimiter } = require('../middleware/rateLimiter');
const { loginSchema, changePasswordSchema } = require('../validators/authValidator');

const router = Router();

router.post('/login', authLimiter, validateRequest(loginSchema), authController.login);
router.post('/refresh', authLimiter, authController.refresh);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.me);
router.post('/change-password', authenticate, authLimiter, validateRequest(changePasswordSchema), authController.changePassword);

module.exports = router;
