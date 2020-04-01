const mongoose = require("mongoose");
const User = require("../schemas/User");
const Category = require("../schemas/Category");
const trimObj = require("../src/helpers/trimObj");

function get(req, res) {
  const { query } = req;
  if (query.author) {
    Category.find({ author: query.author }, (err, category) => {
      if (err) {
        console.error(err);
        errors.category = "couldn't get categories list";
        return res.status(404).json({ errors });
      }
      res.json(category);
    });
  }
  if (query.id) {
    Category.findById(query.id, (err, category) => {
      if (err) {
        console.error(err);
        errors.category = "couldn't get categories list";
        return res.status(404).json({ errors });
      }
      res.json(category);
    });
    // Idea.findById(query.id).then(res => ...).catch(err => ...);
  } else {
    Category.find((err, category) => {
      if (err) {
        console.error(err);
        errors.category = "couldn't get categories list";
        return res.status(404).json({ errors });
      }
      res.json(category);
    });
  }
}
function post(req, res) {
  let errors = {};

  const { id, author, name, ideas } = req.body;
  const update = trimObj({ name, author, ideas });
  const options = { new: true };

  Category.findByIdAndUpdate(id, update, options, (err, category) => {
    if (err) {
      console.error(err);
      errors.category = "couldn't update category";
      return res.status(404).json({ errors });
    }
    res.json(category);
  });
}

function put(req, res) {
  let errors = {};

  const { name, author } = req.body;

  const newCategory = new Category({ name, author });
  newCategory.save((err, category) => {
    if (!category || err) {
      errors.category = "couldn't create category";
      return res.status(404).json({ errors });
    }

    User.findByIdAndUpdate(
      author,
      { $push: { categories: category._id } },
      userError => {
        if (userError) {
          console.error(userError);
          errors.user = "couldn't update user categories";
          return res.status(404).json({ errors });
        }
        res.json(category);
      }
    );
  });
}
function del(req, res) {
  let errors = {};

  const { id } = req.body;

  Category.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      console.error(err);
      errors.category = "couldn't delete category";
      return res.status(404).json({ errors });
    }
    res.json(result);
  });
}

module.exports = { get, post, put, del };
