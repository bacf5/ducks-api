const User = require('../models/User');

const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.header('X-api-key');

  if (!apiKey) return res.status(401).json({ message: 'No API key provided' });

  const user = await User.findOne({ apiKey });
  if (!user) return res.status(403).json({ message: 'Invalid API key' });

  if (user.credits <= 0) {
    return res.status(402).json({ message: 'just make another account lmao' });
  }

  user.credits -= 1;
  await user.save();

  req.user = user;
  next();
};

module.exports = apiKeyAuth;
