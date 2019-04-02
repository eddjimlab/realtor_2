var express = require("express");
var router = express.Router();
var passport = require("passport");
var middleware = require("../middleware");


// Blog route
router.get("/blogAll", function (req, res) {
    res.render("./blog/blogAll");
});
router.get("/blog", function (req, res) {
    res.render("./blog/blog");
});


module.exports = router;