const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const postCtrl = require('./posts.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.use(expressJwt({ secret: config.jwtSecret }))

router.route('/')
    .post(expressJwt({ secret: config.jwtSecret }), postCtrl.createOne)
    .get(postCtrl.getAll)

router.route('/discounts')
    .get(postCtrl.getDiscounts)

router.route('/new-arrives')
    .get(postCtrl.getNewArrives)

router.route('/for-rent')
    .get(postCtrl.getForRent)

router.route('/:postId')
    .get(postCtrl.getOne)
    .put(expressJwt({ secret: config.jwtSecret }), postCtrl.updateOne)
    .delete(expressJwt({ secret: config.jwtSecret }), postCtrl.deleteOne)

module.exports = router;