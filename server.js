//zmienna środowiskowa to zmienna, którą możesz ustawić przed uruchomieniem programu. jest przechowywana w powłoce systemowej
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;
// importowanie biblioteki express w stylu es5
const express = require("express");

var bodyParser = require("body-parser");

const ideas = require("./api/ideas");
const comments = require("./api/comments");
const users = require("./api/users");
//inicjujemy serwer
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// inicjujemy router
const api = express.Router();

//database section
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ideas", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connected to the database");
});

//definiujemy endpointy dla routera
api.get("/ideas", ideas.get);
api.post("/ideas", ideas.post);
api.put("/ideas", ideas.put);
api.delete("/ideas", ideas.del);
api.get("/comments", comments.get);
api.post("/comments", comments.post);
api.put("/comments", comments.put);
// api.delete("/comments", comments.del);
api.get("/users", users.get);
api.put("/users", users.put);
//od ścieżki api serwer ma rozpoznawać endpointy tak jak są zdefiniowane w routerze
app.use("/api", api);

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
