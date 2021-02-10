const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');
const sha256 = require('crypto-js/sha256');


function login(req, res, next) {
  const email = req.body.email.toLowerCase()
  const password = sha256(config.salt + req.body.password).toString()
  // const remember = req.body.remember
  User.find({ email: email, password: password }).lean().exec().then(userData => {

    if (userData.length == 1) {
      const token = jwt.sign({
        email: email,
        user_type: userData[0].user_type,
        user_id: userData[0]._id,
        city: userData[0].city,
        name: userData[0].name,
        surname: userData[0].surname
      }, config.jwtSecret, { expiresIn: "30d" });

      return res.json({
        success: true,
        data: {
          token,
          email: email,
          name: userData[0].name,
          surname: userData[0].surname,
          profile_picture: userData[0].profile_picture,
          user_type: userData[0].user_type,
          user_id: userData[0]._id,
        }
      });

    } else {
      return res.json({
        message: "Përdoruesi apo Fjalëkalimi i gabuar",
        success: false
      })
    }
  }).catch((e) => {
    const err = new APIError(e.message, httpStatus.INTERNAL_SERVER_ERROR, true);
    next(err);
  })
}


module.exports = { login };
