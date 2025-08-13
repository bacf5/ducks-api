const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
  id: Number,
  fact: String,
});

module.exports = mongoose.model('Fact', factSchema);
