const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(userCtrl.getAll)
  .post(expressJwt({ secret: config.jwtSecret }), userCtrl.create)

router.route('/:userId')
  .get(userCtrl.getOne)
  .put(expressJwt({ secret: config.jwtSecret }), userCtrl.updateOne)
  .delete(expressJwt({ secret: config.jwtSecret }), userCtrl.deleteOne)

module.exports = router;
