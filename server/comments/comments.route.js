const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const commentCtrl = require('./comments.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.use(expressJwt({ secret: config.jwtSecret }))

router.route('/')
    .post(commentCtrl.createOne)
    .get(commentCtrl.getAll)

router.route('/:commentId')
    .get(commentCtrl.getOne)
    .put(commentCtrl.updateOne)
    .delete(commentCtrl.deleteOne)

module.exports = router;