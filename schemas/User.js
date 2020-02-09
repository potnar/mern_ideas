const mongoose = require("mongoose");

// nasza funkcja hashująca, czyli biorąca jakiś klucz i transformująca go w unikatowy,
//  nieodwracalny zbitek znaków
// (dlatego funkcje hashujące używają takich operacji matematycznych,
// których nie da się łatwo cofnąć, jak np. pierwiastkowanie)
// potrzebujemy hashowania aby zapisywać hasła w taki sposób, żeby nie dało się ich odczytać,
// ale dało się je rozpoznać
// sprawdzamy więc KTÓRE hasło należy do jakiego użytkownika,
// a nie JAKIE hasło należy do jakiego użytkownika
const crypto = require("crypto");

// biblioteka służąca do tworzenia JSONowych tokenów, czyli obiektów zawierających informację
// o sesji użytkownika - składa się ze stringu, w której trzy części są oddzielane kropkami:
// 1. header (algorytm i typ tokena),
// 2. payload (dane, np. nazwa użytkownika),
// 3. verify signature (klucz po którym sprawdzamy czy token jest autoryzowany)
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    hash: String,
    salt: String
  },
  {
    strict: true
  }
);
//hashowanie przy rejestracji
//dodajemy do usersSchema (jest powyżej) nową metode za pomocą methods (mongoosowy obiektem do nadawania metod instancji modelu)
//nazywamy te metode setPassword
usersSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};
//porównywanie hashy przy logowaniu
usersSchema.methods.validatePassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};
//zapisywanie tokena użytkownika w procesie serwera.
//generowanie tokenów
usersSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      username: this.username,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    //klucz do autoryzowania tokenów
    process.env.AUTH_SECRET
  );
};

usersSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    username: this.username,
    name: this.name,
    surname: this.surname,
    categories: this.categories,
    token: this.generateJWT()
  };
};

function validateJWT(token, cb) {
  // cb = (err, decoded) => ...
  return jwt.verify(token, process.env.AUTH_SECRET, cb);
}

function isResourceRestricted(Model, resourceId, secondaryKey, token) {
  /*
  When user wants to modify a resource, we have to first check if his token gives him privilege to modify it.
  Model - is a requested resource mongoose Model, so, for example if we want to add idea to categories, it will be Category model. 
  resourceId - is a requested resource id, so, for example if we want to add idea to categories, it will be categorie's id. 
  secondaryKey - is a requested resource foreign key by which we can access user's id. That way we can compare if token belongs to this user. 
  token - authorization token without "Bearer " prefix.

  Function returns promise, which decodes token to get the user's id, and find's the corresponding user's id on the required resource. 
  If they're the same, it resolves with decoded token.
  */
  return new Promise((resolve, reject) => {
    let errors = {};
    return Model.findById(resourceId, (err, res) => {
      if (err) {
        console.error(err);
        errors.category = "couldn't find " + resourceId;
        reject(errors);
      }
      validateJWT(token, (validateErr, decoded) => {
        if (err) {
          console.error(err);
          errors.token = "Token couldn't be decoded";
          reject(errors);
        }
        if (res[secondaryKey].toString() === decoded.id) {
          resolve(decoded);
        }
        reject({ errors: err || validateErr });
      });
    });
  });
}

module.exports = mongoose.model("User", usersSchema);
module.exports.validateJWT = validateJWT;
module.exports.isResourceRestricted = isResourceRestricted;
