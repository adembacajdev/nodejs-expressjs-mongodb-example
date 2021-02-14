const Test = require('./test.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const fs = require('fs');
const config = require('../../config/config');

function createOne(req, res, next) {
  const files = req.files;
  const images = files['images'];
  var imagesArray = [];

  let imagePromises = new Promise((resolve, reject) => {
    images.forEach((file, index, array) => {
      const filename = `${Date.now()}${file.name}`;
      fs.writeFile(`${config.basePath}/public/profile/${filename}`, file.data, function (err) {
        if (err) {
          return false
        }
      });
      var photo = `${config.domain}/profile/${filename}`;
      imagesArray.push({ photo, index })

      if (index === array.length - 1) resolve();
    })
  })

  imagePromises.then(response => {
    const imagesModel = new Test({
      images: imagesArray
    })

    imagesModel.save()
      .then((savedImages) => {
        res.json({ success: true, data: savedImages })
      })
      .catch(e => {
        const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
        next(err);
      });
  })
}

function deleteOne(req, res, next) {
  Test.findOneAndRemove({ _id: req.params.sizeId }).then(data => {
    if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
    else res.json({ success: false, message: "Rekordi nuk ekzistion." });
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getAll(req, res, next) {
  Test.find().select('_id size_name').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function uploadImages(req, res, next) {
  Test.findOne({ _id: req.body.post_id }).exec().then((data) => {
    const files = req.files;
    const file = files['file'];
    const fileLinks = '';

    file.forEach(file => {
      const filename = `${data._id}${file.name}.jpg`;
      fs.writeFile(`${config.basePath}/public/profile/${filename}`, file.data, function (err) {
        if (err) {
          return res.json({
            success: false,
            message: "Problem me ngarkim të fotos."
          })
        }

        var photo = `${config.domain}/profile/${filename}`;
        console.log('====PHOTO====', photo)
        if (fileLinks === '') {
          fileLinks = photo;
        } else {
          fileLinks = `${fileLinks},${photo}`
        }
      });
    })
    res.json({ success: true, data: fileLinks })
  }).catch(e => {
    const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
    next(err);
  })
}

module.exports = { createOne, deleteOne, getAll };