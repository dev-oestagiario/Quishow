const express = require('express');
const router = express.Router();

// Página de planos
router.get('/', (req, res) => {
  res.render('planos');
});

module.exports = router;
