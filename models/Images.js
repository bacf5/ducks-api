const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  id: Number,
  url: String,
});

module.exports = mongoose.model('Image', imageSchema);
