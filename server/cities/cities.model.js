const mongoose = require('mongoose');

/**
 * User Schema
 */
const CitySchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('City', CitySchema);
