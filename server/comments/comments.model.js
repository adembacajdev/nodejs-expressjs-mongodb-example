const mongoose = require('mongoose');
const { mongo } = require('../../config/config');

/**
 * User Schema
 */
const CommentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    default: 1,
    min: 0,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
