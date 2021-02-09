const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const favCtrl = require('./favourites.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.use(expressJwt({ secret: config.jwtSecret }))

router.route('/')
    .post(favCtrl.createOne)

router.route('/user/:userId')
    .get(favCtrl.getAll)

router.route('/:favouriteId')
    .get(favCtrl.getOne)
    .put(favCtrl.updateOne)
    .delete(favCtrl.deleteOne)

module.exports = router;