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
    token: this.generateJWT()
  };
};

module.exports = mongoose.model("User", usersSchema);
