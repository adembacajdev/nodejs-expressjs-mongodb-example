const Slider = require('./sliders.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createOne(req, res, next) {
  const sliderModel = new Size({
    shop_name: req.body.shop_name,
    shop_description: req.body.shop_description,
    shop_image: req.body.shop_image,
    shop_id: req.body.shop_id,
    expired_date: req.body.expired_date
  })

  Slider.find({ shop_name: req.body.shop_name }).lean().exec().then((name) => {
    if (name.length > 0) {
      res.json({ success: false, message: 'A Slider with the same name already exists.' })
    } else {
      sliderModel.save()
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
  Slider.findOne({ _id: req.params.sliderId }).exec().then((data) => {
    shop_name = req.body.shop_name ? req.body.shop_name : data.shop_name;
    shop_description = req.body.shop_description ? req.body.shop_description : data.shop_description;
    shop_image = req.body.shop_image ? req.body.shop_image : data.shop_name;
    shop_id = req.body.shop_id ? req.body.shop_id : data.shop_id;
    expired_date = req.body.expired_date ? req.body.expired_date : data.expired_date;
    data.save()
      .then((saved) => {
        res.json({ success: true, data: saved })
      })
      .catch(e => {
        res.json({ success: false, message: "Unable to update the Size." })
      })
  })
}

function deleteOne(req, res, next) {
  Slider.findOneAndRemove({ _id: req.params.sliderId }).then(data => {
    if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
    else res.json({ success: false, message: "Rekordi nuk ekzistion." });
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getAll(req, res, next) {
  Slider.find().select('_id shop_name shop_description shop_image expired_date shop_id createdAt').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getOne(req, res, next) {
  Slider.findOne({ _id: req.params.sliderId }).select('_id shop_name shop_description shop_image expired_date shop_id createdAt').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

module.exports = { createOne, updateOne, deleteOne, getAll, getOne };