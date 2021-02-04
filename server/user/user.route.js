const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.use(expressJwt({ secret: config.jwtSecret }))

router.route('/')
  .get(userCtrl.getAll)
  .post(userCtrl.create)

router.route('/:userId')
  .get(userCtrl.getOne)
  .put(userCtrl.updateOne)
  .delete(userCtrl.deleteOne)

module.exports = router;
