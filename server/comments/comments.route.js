const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const commentCtrl = require('./comments.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(expressJwt({ secret: config.jwtSecret }), commentCtrl.createOne);

router.route('post/:postId')
    .get(expressJwt({ secret: config.jwtSecret }), commentCtrl.getAllPerPost);

router.route('user/:userId')
    .get(expressJwt({ secret: config.jwtSecret }), commentCtrl.getAllPerUser);

router.route('/:commentId')
    .get(expressJwt({ secret: config.jwtSecret }), commentCtrl.getOne)
    .put(expressJwt({ secret: config.jwtSecret }), commentCtrl.updateOne)
    .delete(expressJwt({ secret: config.jwtSecret }), commentCtrl.deleteOne)

module.exports = router;