var express = require("express");
var router = express.Router();
var personality = require("./personality");
/* GET home page. */
router.use("/personality", personality);

module.exports = router;
