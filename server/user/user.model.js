const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  surname: {
    type: String,
    required: false,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: false,
  },
  birthday: {
    type: Date,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 64,
    maxlength: 64,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  profile_picture: {
    type: String,
    required: false,
    default: null
  },
  phone_number: {
    type: Number,
    default: null
  },
  facebook: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  shop_address: {
    type: String,
    required: false,
  },
  shop_description: {
    type: String,
    required: false,
  },
  user_type: {
    type: Number,
    min: 0,
    max: 1,
    default: 0,
    required: false
  }
});

module.exports = mongoose.model('User', UserSchema);
