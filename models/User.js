const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  apiKey: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  credits: {
    type: Number,
    default: 500,
  },
});

module.exports = mongoose.model('User', userSchema);
