const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const sliderCtrl = require('./sliders.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(expressJwt({ secret: config.jwtSecret }), sliderCtrl.createOne)
    .get(sliderCtrl.getAll)

router.route('/:sliderId')
    .get(sliderCtrl.getOne)
    .put(expressJwt({ secret: config.jwtSecret }), sliderCtrl.updateOne)
    .delete(expressJwt({ secret: config.jwtSecret }), sliderCtrl.deleteOne)

module.exports = router;