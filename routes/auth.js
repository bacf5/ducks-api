const express = require('express');
const User = require('../models/User');
const validator = require('validator');
const sendEmail = require('../utils/mailer');
require('dotenv').config();

const router = express.Router();

// Creates a new user and saves it to the database
router.post('/register', async (req, res) => {
  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email required' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  let user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    user = new User({
      name,
      email,
      credits: 500,
    });

    await user.save();
    const { apiKey } = user;
    await sendEmail(email, apiKey);

    res.json({
      message: 'User created successfully',
      apiKey: user.apiKey,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error sending email to user' });
  }
});

module.exports = router;
