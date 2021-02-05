const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const catCtrl = require('./categories.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(expressJwt({ secret: config.jwtSecret }), catCtrl.createOne)
    .get(catCtrl.getAll)

router.route('/:categoryId')
    .get(catCtrl.getOne)
    .put(expressJwt({ secret: config.jwtSecret }), catCtrl.updateOne)
    .delete(expressJwt({ secret: config.jwtSecret }), catCtrl.deleteOne)

module.exports = router;