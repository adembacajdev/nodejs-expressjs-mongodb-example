const mongoose = require('mongoose');

/**
 * User Schema
 */
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  for_rent: {
    type: Boolean,
    required: false,
    default: false
  },
  rent_price: {
    type: Number,
    required: false,
  },
  phone_number: {
    type: Number,
    required: false,
  },
  shop_address: {
    type: String,
    required: false,
  },
  shop_name: {
    type: String,
    required: false
  },
  discount: {
    type: Boolean,
    required: false,
    default: false
  },
  discount_from: {
    type: Number,
    required: false,
  },
  discount_to: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false
  },
  sizes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Size",
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  images: {
    type: [String],
    required: false,
    default: []
  }
});

module.exports = mongoose.model('Post', PostSchema);
