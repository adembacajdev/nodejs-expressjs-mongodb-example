const mongoose = require('mongoose');

/**
 * User Schema
 */
const TestSchema = new mongoose.Schema({
  images: {
    type: [{ photo: String }],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Test', TestSchema);
