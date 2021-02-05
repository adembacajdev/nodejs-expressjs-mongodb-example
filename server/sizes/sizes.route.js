const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const sizeCtrl = require('./sizes.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(expressJwt({ secret: config.jwtSecret }), sizeCtrl.createOne)
    .get(sizeCtrl.getAll)

router.route('/:sizeId')
    .get(sizeCtrl.getOne)
    .put(expressJwt({ secret: config.jwtSecret }), sizeCtrl.updateOne)
    .delete(expressJwt({ secret: config.jwtSecret }), sizeCtrl.deleteOne)

module.exports = router;