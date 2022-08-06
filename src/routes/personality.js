const personalityController = require('../controllers/personality')

var express = require("express");
var router = express.Router();

router.post("/start", (req, res, next) => {
    let data = personalityController.startTest()
    res.json({ success: true, data })
});
router.post("/next-question", (req, res, next) => {
    let data = personalityController.getNextQuestion(req.body)
    res.json({ success: true, data })
});
router.post("/submit", (req, res, next) => {
    let data = personalityController.submit(req.body)
    res.json({ success: true, data })
});
module.exports = router;