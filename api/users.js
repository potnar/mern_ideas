const mongoose = require("mongoose");
const User = require("../schemas/User");

function get(req, res) {
  const { query } = req;
  if (query.id) {
    User.findById(query.id)
      .populate("categories")
      .exec((err, user) => {
        if (err) {
          console.error(err);
          errors.user = "couldn't get users list";
          res.status(404).json({ errors });
        }
        res.json(user);
      });
  } else {
    User.find()
      .populate("categories")
      .exec((err, user) => {
        if (err) {
          console.error(err);
          errors.user = "couldn't get users list";
          res.status(404).json({ errors });
        }
        res.json(user);
      });
  }
}
function put(req, res) {
  let errors = {};

  const { username, name, surname } = req.body;

  const newUser = new User({ username, name, surname });
  newUser.save((err, user) => {
    if (err) {
      console.error(err);
      errors.user = "couldn't create user";
      res.status(404).json({ errors });
    }
    res.json(user);
  });
}

module.exports = { get, put };
