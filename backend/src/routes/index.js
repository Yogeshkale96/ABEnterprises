const { Router } = require('express');
const healthRoutes = require('./healthRoutes');
const authRoutes = require('./authRoutes');
const searchRoutes = require('./searchRoutes');
const serviceRoutes = require('./serviceRoutes');
const productRoutes = require('./productRoutes');
const industryRoutes = require('./industryRoutes');
const enquiryRoutes = require('./enquiryRoutes');
const adminRoutes = require('./adminRoutes');

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/search', searchRoutes);
router.use('/services', serviceRoutes);
router.use('/products', productRoutes);
router.use('/industries', industryRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
