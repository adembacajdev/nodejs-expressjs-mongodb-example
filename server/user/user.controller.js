const User = require('./user.model');
const sha256 = require('crypto-js/sha256');
const config = require('../../config/config');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function create(req, res, next) {
  const userModel = new User({
    email: req.body.email.toLowerCase(),
    password: sha256(config.salt + req.body.password),
    name: req.body.name,
    surname: req.body.surname,
    city: req.body.city,
    birthday: req.body.birthday,
    profile_picture: req.body.profile_picture,
    phone_number: req.body.phone_number,
    facebook: req.body.facebook,
    instagram: req.body.instagram,
    shop_address: req.body.shop_address,
    shop_description: req.body.shop_description,
    user_type: req.body.user_type
  });

  User.find({ email: req.body.email }).lean().exec().then((user) => {
    if (user.length > 0) {
      res.json({
        success: false,
        message: "Përdoruesi me email apo numër leternjoftimi të njëjtë ekziston."
      })
    } else {
      userModel.save()
        .then((savedUser) => {
          res.json({ success: true, data: savedUser })
        })
        .catch(e => {
          const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
          next(err);
        });
    }
  })
}

function getAll(req, res, next) {
  User.find().select('_id user_type name surname city email phone_number').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getOne(req, res, next) {
  User.findOne({ _id: req.params.userId }).select('_id user_type name surname city email phone_number facebook instagram birthday createdAt profile_picture shop_address shop_description').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function updateOne(req, res, next) {
  User.findOne({ _id: req.params.userId }).exec().then((data) => {
    data.name = req.body.name ? req.body.name : data.name;
    data.surname = req.body.surname ? req.body.surname : data.surname;
    data.city = req.body.city ? req.body.city : data.city;
    data.birthday = req.body.birthday ? req.body.birthday : data.birthday;
    data.phone_number = req.body.phone_number ? req.body.phone_number : data.phone_number;
    data.facebook = req.body.facebook ? req.body.facebook : data.facebook;
    data.instagram = req.body.instagram ? req.body.instagram : data.instagram;
    data.shop_address = req.body.shop_address ? req.body.shop_address : data.shop_address;
    data.shop_description = req.body.shop_description ? req.body.shop_description : data.shop_description;
    data.user_type = req.body.user_type ? req.body.user_type : data.user_type;
    data.save()
      .then((savedUser) => {
        res.json({ success: true, data: savedUser })
      })
      .catch(e => {
        res.json({ success: false, message: "Unable to update the Category." })
      })
  })
}

function deleteOne(req, res, next) {
  User.findOneAndRemove({ _id: req.params.userId }).then(data => {
    if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
    else res.json({ success: false, message: "Rekordi nuk ekzistion." });
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

module.exports = { create, getAll, getOne, updateOne, deleteOne };