//zmienna środowiskowa to zmienna, którą możesz ustawić przed uruchomieniem programu. jest przechowywana w powłoce systemowej
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;
// importowanie biblioteki express w stylu es5
const express = require("express");
const auth = require("./auth");
const session = require("express-session");
const path = require("path");
require("./config/passport");

const bodyParser = require("body-parser");
//importowanie cors. uprzednio należy zainstalować cors npm i --save cors. Jest po to aby wysyłać zapytania do obcych domen
const cors = require("cors");
const passport = require("passport");

const users = require("./api/users");
const authApi = require("./api/auth");
const categories = require("./api/categories");
const ideas = require("./api/ideas");
const comments = require("./api/comments");

//inicjujemy serwer
const app = express();

const whitelist = [
  `http://localhost:${process.env.PORT}`,
  `http://localhost:3000`
];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

// //użycie biblioteki cors aby pozwolić na zapytania pomiędzy różnymi hostami
app.use(cors()); //(corsOptions));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
const loggerMiddleware = (req, res, next) => {
  console.log(req.protocol + "://" + req.get("host") + req.originalUrl);
  next();
};
app.use(loggerMiddleware);
app.use(express.static(path.join(__dirname, "build")));

// Express Session
// app.use(
//   session({
//     secret: process.env.AUTH_SECRET,
//     cookie: { maxAge: 24 * 60 * 60 * 1000 },
//     resave: true,
//     saveUninitialized: true
//   })
// );

// Passport init
// app.use(passport.initialize());
// app.use(passport.session());

// middleware służące do mapowania zapytań na pliki na serwerze
// (dzięki temu możemy pobrać np. zawartość folderu /build/static z poziomu strony internetowej)
// app.use(express.static(path.join(__dirname, "build")));

// inicjujemy router

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

const authRouter = express.Router();
const apiRouter = express.Router();

//definiujemy endpointy dla routera
authRouter.post("/register", auth.optional, authApi.register);
authRouter.post("/login", auth.optional, authApi.login);
authRouter.post("/", auth.optional, authApi.auth);
// authRouter.post("/login", passport.authenticate("local"), function(req, res) {
//   res.send(req.user);
// });

apiRouter.get("/categories", auth.required, categories.get);
apiRouter.post("/categories", auth.required, categories.post);
apiRouter.put("/categories", auth.required, categories.put);
apiRouter.delete("/categories", auth.required, categories.del);

apiRouter.get("/ideas", auth.required, ideas.get);
apiRouter.post("/ideas", auth.required, ideas.post);
apiRouter.put("/ideas", auth.required, ideas.put);
apiRouter.delete("/ideas", auth.required, ideas.del);

apiRouter.get("/comments", auth.required, comments.get);
apiRouter.post("/comments", auth.required, comments.post);
apiRouter.put("/comments", auth.required, comments.put);
apiRouter.delete("/comments", auth.required, comments.del);

apiRouter.get("/users", auth.required, users.get);
apiRouter.put("/users", auth.required, users.put);
apiRouter.delete("/users", auth.required, users.del);
// od ścieżki apiRouter serwer ma rozpoznawać endpointy tak jak są zdefiniowane w routerze

app.use(loggerMiddleware);
apiRouter.use("/auth", authRouter);
app.use("/api", apiRouter);

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
