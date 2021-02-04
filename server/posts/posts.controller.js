const Post = require('./posts.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createOne(req, res, next) {
  const postModel = new Post({
    title: req.body.title,
    for_rent: req.body.for_rent,
    phone_number: req.body.phone_number,
    shop_address: req.body.shop_address,
    shop_name: req.body.shop_name,
    discount: req.body.discount,
    discount_from: req.body.discount_from,
    discount_to: req.body.discount_to,
    price: req.body.price,
    category: req.body.category,
    sizes: req.body.sizes,
    images: req.body.images
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
    data.for_rent = req.body.for_rent ? req.body.for_rent : data.for_rent;
    data.phone_number = req.body.phone_number ? req.body.phone_number : data.phone_number;
    data.shop_address = req.body.shop_address ? req.body.shop_address : data.shop_address;
    data.shop_name = req.body.shop_name ? req.body.shop_name : data.shop_name;
    data.discount = req.body.discount ? req.body.discount : data.discount;
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
  Post.find().select('_id title description price images for_rent discount sizes').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getOne(req, res, next) {
  Category.findOne({ _id: req.params.categoryId }).select('_id title for_rent phone_number shop_address shop_name discount discount_from discount_to price category sizes createdAt images').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

module.exports = { createOne, updateOne, deleteOne, getAll, getOne };