const Favourite = require('./favourites.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createOne(req, res, next) {
  const favouriteModel = new Favourite({
    post_id: req.body.post_id,
    user_id: req.body.user_id
  })

  favouriteModel.save()
    .then((saved) => {
      res.json({ success: true, data: saved })
    })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    });
}

function updateOne(req, res, next) {
  Favourite.findOne({ _id: req.params.favouriteId }).exec().then((data) => {
    data.post_id = req.body.post_id ? req.body.post_id : data.post_id;
    data.user_id = req.body.user_id ? req.body.user_id : data.user_id;
    data.save()
      .then((saved) => {
        res.json({ success: true, data: saved })
      })
      .catch(e => {
        res.json({ success: false, message: "Unable to update the Favourite." })
      })
  })
}

function deleteOne(req, res, next) {
  Favourite.findOneAndRemove({ _id: req.params.favouriteId }).then(data => {
    if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
    else res.json({ success: false, message: "Rekordi nuk ekzistion." });
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getAll(req, res, next) {
  Favourite.find().select('_id post_id user_id').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getOne(req, res, next) {
  Favourite.findOne({ _id: req.params.favouriteId }).select('_id post_id user_id createdAt').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

module.exports = { createOne, updateOne, deleteOne, getAll, getOne };