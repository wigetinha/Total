const express = require('express');
const router = express.Router();

router.get('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ param: userId });
});

router.get('/usuarios', (req, res) => {
  res.json({ querys: req.query });
});

router.post('/usuarios', (req, res) => {
  res.json({ body: req.body });
});

// 🔴 IMPORTANTE: exporta el router directamente
module.exports = router;
// ✅ NO uses: module.exports = { router } ni exports = router ni export default router
