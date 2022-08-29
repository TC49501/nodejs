var express = require("express");

var router = express.Router();

router.get("/", function(req, res) {
    console.log("In Index route");
    res.render("index");
});

router.get("/home", function(req, res) {
    console.log("In Home routee");
    res.render("home");
});

module.exports = router;