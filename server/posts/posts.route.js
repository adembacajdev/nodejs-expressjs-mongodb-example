const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const postCtrl = require('./posts.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.use(expressJwt({ secret: config.jwtSecret }))

router.route('/')
    .post(postCtrl.createOne)
    .get(postCtrl.getAll)

router.route('/:postId')
    .get(postCtrl.getOne)
    .put(postCtrl.updateOne)
    .delete(postCtrl.deleteOne)

module.exports = router;