const mongoose = require("mongoose");
const Idea = require("../schemas/Idea");
const trimObj = require("../src/helpers/trimObj");
const User = require("../schemas/User");
const Rating = require("../schemas/Rating");

function post(req, res) {
  let errors = {};

  const { author, value, ideaId, id } = req.body;
  //1. stworzyć nowy rating
  //      const newRating = new Rating({author, value}) zapisanie w () argumentów, które będą przekazane do constructora klasy Rating
  //      newRating.save((error, result) => {}) metoda z klasy Rating pozwala na zapisywanie w bazie danych
  //1. lub zaktualizować istniejący
  //
  //2. wyszukać i zaktualizować idea, do której rating ma być przypisany
  //      zaktualizowanie idea za pomocą mongoose schema findByIdAndUpdate metody na klasie Idea
  //3. wysłać do frontendu informacje z zaktualizowanym średnim ratingiem
  //
  if (value < 0 || value > 5) {
    errors.value = "value can be between 0 and 5";
    return res.status(400).json({ errors });
  }
  const update = trimObj({
    author,
    value,
  });

  Rating.update(
    { _id: id || new mongoose.mongo.ObjectID() },
    update,
    { upsert: true, setDefaultsOnInsert: true },
    (error, result) => {
      if (error) {
        console.error(error);
        errors.rating = "couldn't update rating";
        res.status(500).json({ errors });
      } else {
        // const ideaUpdate = { $insertOne: { ratings: result._id } };
        const ideaUpdate = Array.isArray(result.upserted)
          ? { $push: { ratings: result.upserted[0]._id } }
          : {};
        Idea.findByIdAndUpdate(ideaId, ideaUpdate, (ideaError) => {
          if (ideaError) {
            console.error(ideaError);
            errors.rating = ideaError.message;
            res.status(404).json({ errors });
          } else {
            res.json(result);
          }
        });
      }
    }
  );
}

function get(req, res) {
  let errors = {};
  Rating.find((err, ratings) => {
    if (err) {
      console.error(err);
      errors.rating = err.message;
      res.status(500).json({ errors });
    } else {
      res.json(ratings);
    }
  });
}

module.exports = { get, post };
