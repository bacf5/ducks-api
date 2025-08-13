const express = require('express');
const apiKeyAuth = require('../middleware/auth.js');
const router = express.Router();

router.get('/facts', apiKeyAuth, (req, res) => {
  res.json({
    message: 'Facts protected API',
    user: req.user.name,
  });
});

router.get('/usage', apiKeyAuth, (req, res) => {
  res.json({
    message: 'API usage details',
    remainingCredits: req.user.credits,
  });
});

module.exports = router;
