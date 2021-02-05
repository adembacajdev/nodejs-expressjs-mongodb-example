const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const citiesCtrl = require('./cities.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(expressJwt({ secret: config.jwtSecret }), citiesCtrl.createOne)
    .get(citiesCtrl.getAll)

router.route('/:cityId')
    .get(citiesCtrl.getOne)
    .put(expressJwt({ secret: config.jwtSecret }), citiesCtrl.updateOne)
    .delete(expressJwt({ secret: config.jwtSecret }), citiesCtrl.deleteOne)

module.exports = router;