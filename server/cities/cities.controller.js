const City = require('./cities.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createOne(req, res, next) {
  const cityModel = new City({
    city_name: req.body.city_name
  })

  City.find({ city_name: req.body.city_name }).lean().exec().then((name) => {
    if (name.length > 0) {
      res.json({ success: false, message: 'A Size with the same name already exists.' })
    } else {
      cityModel.save()
        .then((saved) => {
          res.json({ success: true, data: saved })
        })
        .catch(e => {
          const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
          next(err);
        });
    }
  })
}

function updateOne(req, res, next) {
  City.findOne({ _id: req.params.cityId }).exec().then((data) => {
    data.city_name = req.body.city_name ? req.body.city_name : data.city_name;
    data.save()
      .then((saved) => {
        res.json({ success: true, data: saved })
      })
      .catch(e => {
        res.json({ success: false, message: "Unable to update the City." })
      })
  })
}

function deleteOne(req, res, next) {
  City.findOneAndRemove({ _id: req.params.cityId }).then(data => {
    if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
    else res.json({ success: false, message: "Rekordi nuk ekzistion." });
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getAll(req, res, next) {
  City.find().select('_id city_name').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getOne(req, res, next) {
  City.findOne({ _id: req.params.cityId }).select('_id city_name createdAt').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

module.exports = { createOne, updateOne, deleteOne, getAll, getOne };