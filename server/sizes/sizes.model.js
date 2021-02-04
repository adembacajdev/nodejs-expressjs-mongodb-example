const mongoose = require('mongoose');

/**
 * User Schema
 */
const SizeSchema = new mongoose.Schema({
  size_name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Size', SizeSchema);
