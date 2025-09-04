const express = require('express');
const apiKeyAuth = require('../middleware/auth.js');
const Image = require('../models/Images');
const router = express.Router();

// get a random image - protected route

router.get('/image/random', apiKeyAuth, async (req, res) => {
  try {
    const randomImage = await Image.aggregate([{ $sample: { size: 1 } }]);
    const { id, url } = randomImage[0];

    if (randomImage.length > 0) {
      res.status(200).json({ id, url });
    } else {
      res.status(404).json({ message: 'No images found in db' });
    }
  } catch (err) {
    console.log('Error fetching random image', err);
    res.status(500).json({ message: 'Error fetching random image' });
  }
});

module.exports = router;
