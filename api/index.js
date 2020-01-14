const express = require("express");
const router = express.Router();

router.use("/test_api", require("./test_api"));

module.exports = router;
