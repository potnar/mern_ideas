const User = require("../schemas/User");

function get(req, res) {
  const { query } = req;
  if (query.id) {
    User.findById(query.id)
      .populate("categories")
      .exec((err, user) => {
        if (err) {
          errors.user = err;
          res.status(404).json({ errors });
        }
        res.json(user);
      });
  } else {
    User.find()
      .populate("categories")
      .exec((err, user) => {
        if (err) {
          errors.user = err;
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
      errors.user = err;
      res.status(404).json({ errors });
    }
    res.json(user);
  });
}

function del(req, res) {
  let errors = {};

  const { id } = req.body;

  User.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      errors.user = err;
      res.status(404).json({ errors });
    }
    res.json(result);
  });
}

module.exports = { get, put, del };
