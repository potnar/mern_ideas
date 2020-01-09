//zmienna środowiskowa to zmienna, którą możesz ustawić przed uruchomieniem programu. jest przechowywana w powłoce systemowej
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;
// importowanie biblioteki express w stylu es5
const express = require("express");
const session = require("express-session");
const path = require("path");
require("./config/passport");

const bodyParser = require("body-parser");
//importowanie cors. uprzednio należy zainstalować cors npm i --save cors. Jest po to aby wysyłać zapytania do obcych domen
const cors = require("cors");

const users = require("./api/users");
const categories = require("./api/categories");
const ideas = require("./api/ideas");
const comments = require("./api/comments");

//inicjujemy serwer
const app = express();

const whitelist = ["http://localhost", "http://example2.com"];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

//użycie biblioteki cors aby pozwolić na zapytania pomiędzy różnymi hostami
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
const loggerMiddleware = (req, res, next) => {
  console.log(req.protocol + "://" + req.get("host") + req.originalUrl);
  next();
};
app.use(loggerMiddleware);
// middleware służące do mapowania zapytań na pliki na serwerze
// (dzięki temu możemy pobrać np. zawartość folderu /build/static z poziomu strony internetowej)
app.use(express.static(path.join(__dirname, "build")));

// inicjujemy router
const api = express.Router();

//database section
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ideas", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

/*  */
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to the database");
});

//definiujemy endpointy dla routera
api.get("/categories", categories.get);
api.post("/categories", categories.post);
api.put("/categories", categories.put);
api.delete("/categories", categories.del);

api.get("/ideas", ideas.get);
api.post("/ideas", ideas.post);
api.put("/ideas", ideas.put);
api.delete("/ideas", ideas.del);

api.get("/comments", comments.get);
api.post("/comments", comments.post);
api.put("/comments", comments.put);
api.delete("/comments", comments.del);

api.get("/users", users.get);
api.put("/users", users.put);
//od ścieżki api serwer ma rozpoznawać endpointy tak jak są zdefiniowane w routerze

app.use(loggerMiddleware);
app.use("/api", api);

// ^
// api.get("/ideas") => app.get("/api/ideas")

// tak samo jak w routerze "api" powyżej, definiujemy co serwer ma zwracać w odpowiedzi
// na zapytanie typu "GET". "*" oznacza, że dla każdej możliwej ścieżki ma zwracać naszą stronę.
// ponieważ nasz app.get znajduje się poniżej api, działa to podobnie jak w React routerze,
// tzn. najpierw są rozwiązywane ścieżki opisane wcześniej, a dopiero na końcu ta tutaj
// (czyli de facto wszystkie inne niż powyżej)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
