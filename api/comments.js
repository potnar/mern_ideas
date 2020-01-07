const mongoose = require("mongoose");
const Comment = require("../schemas/Comment");

function get(req, res) {
  const { query } = req;
  if (query.id) {
    Comment.findById(query.id, (err, comment) => {
      if (err) {
        console.error(err);
        errors.comment = "couldn't get comments list";
        res.status(404).json({ errors });
      }
      res.json(comment);
    });
  } else {
    Comment.find((err, comment) => {
      if (err) {
        console.error(err);
        errors.comment = "couldn't get comments list";
        res.status(404).json({ errors });
      }
      res.json(comment);
    });
  }
}

function post(req, res) {
  let errors = {};

  const { id, content } = req.body;
  const update = { content };
  const options = { new: true };

  Comment.findByIdAndUpdate(id, update, options, (err, comment) => {
    if (err) {
      console.error(err);
      errors.comment = "couldn't update comment";
      res.status(404).json({ errors });
    }
    res.json(comment);
  });
}

function put(req, res) {
  let errors = {};
  const { author, content } = req.body;

  const newComment = new Comment({ author, content });
  newComment.save((err, comment) => {
    if (err) {
      console.error(err);
      errors.comment = "couldn't create comment";
      res.status(404).json({ errors });
    }
    res.json(comment);
  });
}

function del(req, res) {
  let errors = {};

  const { id } = req.body;

  Comment.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      console.error(err);
      errors.comment = "couldn't delete comment";
      res.status(404).json({ errors });
    }
    res.json(result);
  });
}

module.exports = { put, get, post, del };
