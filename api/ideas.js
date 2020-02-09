//importowanie
const mongoose = require("mongoose");
const Category = require("../schemas/Category");
const Idea = require("../schemas/Idea");
const trimObj = require("../src/helpers/trimObj");
const User = require("../schemas/User");

//idea.find użyć, popatrzec na doc mongo. wyciągnąć wszystkie ideas z bazy danych
// Przykład funkcji asynchronicznej (promise). Funkcja ta jest wywoływana równolegle (asynchronicznie)
// const promise = new Promise ((resolve, reject) => {
//   const data = getDataFromDb ();
//   resolve (data);
//   !data && reject ("couldn't get data");
// })
// promise.then(wynik => console.log(wynik)).catch(err => console.error(err))
// Funkcja asynchroniczna, która blokuje resztę kodu dopóki się nie wykona
//   async function func () {
//   return await getDataFromDB();
// }
function get(req, res) {
  //query to są parametry, e.g. http://url?param1=value&param2=value czyli query to są param1 i param2 czyli przesyłana dana
  const { query } = req;
  const { category } = query;
  if (query.id) {
    Idea.findById(query.id, (err, idea) => {
      if (err) {
        console.error(err);
        errors.idea = "couldn't get ideas list";
        res.status(404).json({ errors });
      }
      res.json(idea);
    });
    // Idea.findById(query.id).then(res => ...).catch(err => ...);
  } else {
    Idea.find({ category }, (err, idea) => {
      if (err) {
        console.error(err);
        errors.idea = "couldn't get ideas list";
        res.status(404).json({ errors });
      }
      res.json(idea);
    });
  }
}

function post(req, res) {
  // object desctructuring:
  // równoważne z const body = req.body;
  // wyciąganie body z req
  // const { body } = req;
  // const { name } = body;

  let errors = {};

  const { id, name, comments } = req.body;
  const update = trimObj({ name, comments });
  const options = { new: true };

  Idea.findByIdAndUpdate(id, update, options, (err, idea) => {
    if (err) {
      console.error(err);
      errors.idea = "couldn't update idea";
      res.status(404).json({ errors });
    }
    res.json(idea);
  });
}

function put(req, res) {
  let errors = {};

  const { name, category } = req.body;

  User.isResourceRestricted(
    Category,
    category,
    "author",
    req.headers.authorization.slice(7)
  )
    .then(decodedToken => {
      const newIdea = new Idea({ name, category });
      newIdea.save((err, idea) => {
        if (err) {
          console.error(err);
          errors.idea = "couldn't create idea";
          res.status(404).json({ errors });
        }
        idea &&
          Category.findByIdAndUpdate(
            category,
            { $addToSet: { ideas: idea._id } }, // addToSet - mongoose update operator that upserts value to array
            categoryError => {
              if (categoryError) {
                console.error(categoryError);
                errors.category = "couldn't update category idea";
                res.status(404).json({ errors });
              }
              if (err) {
                console.error(err);
                errors.category = "couldn't create idea";
                res.status(404).json({ errors });
              }
              console.log("idea = ", idea);
              res.json(idea);
            }
          );
      });
    })
    .catch(err => {
      console.error("error = ", err);
      res.status(404).json(err);
    });
}

function del(req, res) {
  let errors = {};

  const { query } = req;
  const { category, id } = query;
  User.isResourceRestricted(
    Category,
    category,
    "author",
    req.headers.authorization.slice(7)
  )
    .then(decodedToken => {
      Idea.deleteOne({ _id: id }, (err, result) => {
        if (err) {
          console.error(err);
          errors.idea = "couldn't delete idea";
          res.status(404).json({ errors });
        }
        result.ok &&
          result.n === 1 &&
          Category.findByIdAndUpdate(
            category,
            { $pull: { ideas: id } }, // operator removes from an existing array all instances of a value or values that match a specified condition.
            categoryError => {
              if (categoryError) {
                console.error(categoryError);
                errors.category = "couldn't update category idea";
                res.status(404).json({ errors });
              }
              if (err) {
                console.error(err);
                errors.category = "couldn't create idea";
                res.status(404).json({ errors });
              }
              res.json(result);
            }
          );
      });
    })
    .catch(err => {});
}

module.exports = { get, post, put, del };
