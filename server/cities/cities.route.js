const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const citiesCtrl = require('./cities.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.use(expressJwt({ secret: config.jwtSecret }))

router.route('/')
    .post(citiesCtrl.createOne)
    .get(citiesCtrl.getAll)

router.route('/:cityId')
    .get(citiesCtrl.getOne)
    .put(citiesCtrl.updateOne)
    .delete(citiesCtrl.deleteOne)

module.exports = router;