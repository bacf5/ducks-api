const express = require('express');
const apiKeyAuth = require('../middleware/auth.js');
const Fact = require('../models/Fact');
const router = express.Router();

// Protected route - requires API key - Gets you a random Fact.
router.get('/facts/random', apiKeyAuth, async (req, res) => {
  try {
    const randomFact = await Fact.aggregate([{ $sample: { size: 1 } }]);
    if (randomFact.length > 0) {
      res.status(200).json(randomFact[0]);
    } else {
      res.status(404).json({ message: 'No facts found in db' });
    }
  } catch (err) {
    console.log('Error fetching random fact', err);
    res.status(500).json({ message: 'Error fetching random fact' });
  }
});

// Protected route - Create a new fact and save to the db
// router.post("/facts/create", apiKeyAuth, async (req, res) => {
//   try

// })

// Gives you the amount of credits left
router.get('/usage', apiKeyAuth, (req, res) => {
  res.json({
    message: 'API usage details',
    remainingCredits: req.user.credits,
  });
});

module.exports = router;
