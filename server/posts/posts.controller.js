const Post = require('./posts.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const fs = require('fs');
const config = require('../../config/config');
const { isArray } = require('util');

function createOne(req, res, next) {
  const postModel = new Post({
    title: req.body.title,
    description: req.body.description,
    for_rent: req.body.for_rent,
    rent_price: req.body.rent_price,
    phone_number: req.body.phone_number,
    shop_address: req.body.shop_address,
    shop_name: req.body.shop_name,
    discount: req.body.discount,
    discount_from: req.body.discount_from,
    discount_to: req.body.discount_to,
    price: req.body.price,
    category: req.body.category,
    sizes: req.body.sizes,
    images: req.body.images,
    user_id: req.body.user_id
  })

  postModel.save()
    .then((savedPost) => {
      res.json({ success: true, data: savedPost })
    })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    });
}

function updateOne(req, res, next) {
  Post.findOne({ _id: req.params.postId }).exec().then((data) => {
    data.title = req.body.title ? req.body.title : data.title;
    data.description = req.body.description ? req.body.description : data.description;
    data.for_rent = req.body.for_rent;
    data.rent_price = req.body.rent_price ? req.body.rent_price : data.rent_price;
    data.phone_number = req.body.phone_number ? req.body.phone_number : data.phone_number;
    data.shop_address = req.body.shop_address ? req.body.shop_address : data.shop_address;
    data.shop_name = req.body.shop_name ? req.body.shop_name : data.shop_name;
    data.discount = req.body.discount;
    data.discount_from = req.body.discount_from ? req.body.discount_from : data.discount_from;
    data.discount_to = req.body.discount_to ? req.body.discount_to : data.discount_to;
    data.price = req.body.price ? req.body.price : data.price;
    data.category = req.body.category ? req.body.category : data.category;
    data.sizes = req.body.size ? req.body.sizes : data.sizes;
    data.images = req.body.images ? req.body.images : data.images
    data.save()
      .then((savedPost) => {
        res.json({ success: true, data: savedPost })
      })
      .catch(e => {
        res.json({ success: false, message: "Unable to update the Post." })
      })
  })
}

function deleteOne(req, res, next) {
  Post.findOneAndRemove({ _id: req.params.postId }).then(data => {
    if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
    else res.json({ success: false, message: "Rekordi nuk ekzistion." });
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getAll(req, res, next) {
  Post.find().select('_id user_id title description price images for_rent rent_price discount sizes category discount discount_from discount_to').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getAllPostsByCategory(req, res, next) {
  Post.find({ category: req.params.categoryId }).select('_id user_id title description price images for_rent rent_price discount sizes discount discount_from discount_to').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getAllMyPosts(req, res, next) {
  Post.find({ user_id: req.params.userId }).select('_id user_id title description price images for_rent rent_price discount sizes discount discount_from discount_to').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getOne(req, res, next) {
  Post.findOne({ _id: req.params.postId }).select('_id description user_id title for_rent rent_price phone_number shop_address shop_name discount discount_from discount_to price category sizes createdAt images').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getDiscounts(req, res, next) {
  Post.find({ discount: true }).select('_id user_id title description price images for_rent rent_price discount sizes discount_from discount_to').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getNewArrives(req, res, next) {
  Post.find().sort({ _id: -1 }).limit(6).select('_id user_id title description price images for_rent rent_price discount sizes discount_from discount_to').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getForRent(req, res, next) {
  Post.find({ for_rent: true }).select('_id user_id title description price images for_rent rent_price discount sizes discount_from discount_to').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function uploadImages(req, res, next) {
  Post.findOne({ _id: req.body.post_id }).exec().then((data) => {
    const files = req.files
    const images = files['images'];
    console.log('=====IMAGES=====', images)
    var imagesArray = [];

    let imagePromises = new Promise((resolve, reject) => {
      if (Array.isArray(images)) {
        images.forEach((file, index, array) => {
          const filename = `${Date.now()}${Math.random()}.jpg`;
          fs.writeFile(`${config.basePath}/public/profile/${filename}`, file.data, function (err) {
            if (err) {
              return false
            }
          });
          var photo = `${config.domain}/profile/${filename}`;
          imagesArray.push({ photo })

          if (index === array.length - 1) resolve();
        })
      } else {
        const filename = `${Date.now()}${Math.random()}.jpg`;
        fs.writeFile(`${config.basePath}/public/profile/${filename}`, images.data, function (err) {
          if (err) {
            return false
          }
        });
        var photo = `${config.domain}/profile/${filename}`;
        imagesArray.push({ photo })
        resolve();
      }
    })

    data.images = imagesArray;

    imagePromises.then(() => {
      data.save()
        .then((savedPost) => {
          res.json({ success: true, data: savedPost })
        })
        .catch(e => {
          res.json({ success: false, message: "Unable to update the Post." })
        })
    })
  }).catch(e => {
    const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
    next(err);
  })
}

function updateImages(req, res, next) {
  Post.findOne({ _id: req.body.post_id }).exec().then((data) => {
    const files = req.files
    const images = files['images'];
    var imagesArray = data.images;

    let imagePromises = new Promise((resolve, reject) => {
      if (Array.isArray(images)) {
        images.forEach((file, index, array) => {
          const filename = `${Date.now()}${Math.random()}.jpg`;
          fs.writeFile(`${config.basePath}/public/profile/${filename}`, file.data, function (err) {
            if (err) {
              return false
            }
          });
          var photo = `${config.domain}/profile/${filename}`;
          imagesArray.push({ photo })

          if (index === array.length - 1) resolve();
        })
      } else {
        const filename = `${Date.now()}${Math.random()}.jpg`;
        fs.writeFile(`${config.basePath}/public/profile/${filename}`, images.data, function (err) {
          if (err) {
            return false
          }
        });
        var photo = `${config.domain}/profile/${filename}`;
        imagesArray.push({ photo })
        resolve();
      }
    })

    data.images = imagesArray

    imagePromises.then(() => {
      data.save()
        .then((savedPost) => {
          res.json({ success: true, data: savedPost })
        })
        .catch(e => {
          res.json({ success: false, message: "Unable to update the Post." })
        })
    })
  }).catch(e => {
    const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
    next(err);
  })
}

module.exports = {
  createOne, updateOne, deleteOne, getAll, getOne, getDiscounts, getNewArrives, getForRent, uploadImages,
  getAllMyPosts, getAllPostsByCategory, updateImages
};