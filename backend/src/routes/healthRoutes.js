const { Router } = require('express');
const { checkConnection } = require('../config/database');

const router = Router();

router.get('/', async (req, res) => {
  const health = { status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() };
  try {
    await checkConnection();
    health.database = 'connected';
    res.json({ success: true, data: health });
  } catch {
    health.database = 'unavailable';
    res.status(503).json({ success: false, data: health });
  }
});

module.exports = router;
