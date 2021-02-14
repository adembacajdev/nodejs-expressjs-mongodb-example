const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const sizeCtrl = require('./test.controller');
const expressJwt = require('express-jwt');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    .post(sizeCtrl.createOne)
    .get(sizeCtrl.getAll)

router.route('/:sizeId')
    .delete(sizeCtrl.deleteOne)

module.exports = router;