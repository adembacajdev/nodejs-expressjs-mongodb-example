const Size = require('./sizes.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createOne(req, res, next) {
  const sizeModel = new Size({
    size_name: req.body.size_name
  })

  Size.find({ size_name: req.body.size_name }).lean().exec().then((name) => {
    if (name.length > 0) {
      res.json({ success: false, message: 'A Size with the same name already exists.' })
    } else {
      sizeModel.save()
        .then((savedSize) => {
          res.json({ success: true, data: savedSize })
        })
        .catch(e => {
          const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
          next(err);
        });
    }
  })
}

function updateOne(req, res, next) {
  Size.findOne({ _id: req.params.sizeId }).exec().then((data) => {
    data.size_name = req.body.size_name
    data.save()
      .then((savedSize) => {
        res.json({ success: true, data: savedSize })
      })
      .catch(e => {
        res.json({ success: false, message: "Unable to update the Size." })
      })
  })
}

function deleteOne(req, res, next) {
  Size.findOneAndRemove({ _id: req.params.sizeId }).then(data => {
    if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
    else res.json({ success: false, message: "Rekordi nuk ekzistion." });
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getAll(req, res, next) {
  Size.find().select('_id size_name').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getOne(req, res, next) {
  Size.findOne({ _id: req.params.sizeId }).select('_id size_name').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

module.exports = { createOne, updateOne, deleteOne, getAll, getOne };