const mongoose = require('mongoose');

/**
 * User Schema
 */
const CategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', CategorySchema);
