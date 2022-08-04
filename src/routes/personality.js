const personalityController = require('../controllers/personality')

var express = require("express");
var router = express.Router();

router.post("/detail", personalityController.get);
module.exports = router;