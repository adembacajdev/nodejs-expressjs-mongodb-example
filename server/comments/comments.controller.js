const Comment = require('./comments.model');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

function createOne(req, res, next) {
  const commentModel = new Comment({
    post_id: req.body.post_id,
    user_id: req.body.user_id,
    rating: req.body.rating,
    comment: req.body.comment,
  })

  commentModel.save()
    .then((saved) => {
      res.json({ success: true, data: saved })
    })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    });
}

function updateOne(req, res, next) {
  Comment.findOne({ _id: req.params.commentId }).exec().then((data) => {
    data.post_id = req.body.post_id ? req.body.post_id : data.post_id;
    data.user_id = req.body.user_id ? req.body.user_id : data.user_id;
    data.rating = req.body.rating ? req.body.rating : data.rating;
    data.comment = req.body.comment ? req.body.comment : data.comment;
    data.save()
      .then((saved) => {
        res.json({ success: true, data: saved })
      })
      .catch(e => {
        res.json({ success: false, message: "Unable to update the Comment." })
      })
  })
}

function deleteOne(req, res, next) {
  Comment.findOneAndRemove({ _id: req.params.commentId }).then(data => {
    if (data) res.json({ success: true, message: "Të dhënat u fshinë me sukses." });
    else res.json({ success: false, message: "Rekordi nuk ekzistion." });
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getAll(req, res, next) {
  Comment.find().select('_id post_id user_id rating comment').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

function getOne(req, res, next) {
  Comment.findOne({ _id: req.params.commentId }).select('_id post_id user_id createdAt rating comment').lean().exec().then((data) => {
    res.json({ success: true, data })
  })
    .catch(e => {
      const err = new APIError(e.message, httpStatus.METHOD_NOT_ALLOWED, true);
      next(err);
    })
}

module.exports = { createOne, updateOne, deleteOne, getAll, getOne };