const router = require('express').Router();
const categories = require('./categories.routes');
const { seed } = require('../controllers/seed.controller');

router.use('/categories', categories);
router.post('/seed', seed); // POST /api/seed

module.exports = router;
