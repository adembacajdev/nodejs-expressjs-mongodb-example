const mongoose = require('mongoose');

/**
 * User Schema
 */
const SliderSchema = new mongoose.Schema({
  shop_name: {
    type: String,
    required: true
  },
  shop_description: {
    type: String,
    required: false,
  },
  shop_image: {
    type: String,
    required: true
  },
  shop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  expired_date: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Slider', SliderSchema);
