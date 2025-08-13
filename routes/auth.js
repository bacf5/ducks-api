const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Creates a new user and saves it to the database
router.post('/register', async (req, res) => {
  const { name, email } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  user = new User({
    name,
    email,
    credits: 500,
  });

  await user.save();

  res.json({
    message: 'User created successfully',
    apiKey: user.apiKey,
  });
});

module.exports = router;
