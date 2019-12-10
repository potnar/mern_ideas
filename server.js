//zmienna środowiskowa to zmienna, którą możesz ustawić przed uruchomieniem programu. jest przechowywana w powłoce systemowej
const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;
// importowanie biblioteki express w stylu es5
const express = require("express");
//inicjujemy serwer
const app = express();
// inicjujemy router
const router = express.Router();
//definiujemy endpointy dla routera
router.get("/ideas", (req, res) => res.end("ideas"));
//od ścieżki api serwer ma rozpoznawać endpointy tak jak są zdefiniowane w routerze
app.use("/api", router);

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
