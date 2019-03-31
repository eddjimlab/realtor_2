var express = require("express");
var router = express.Router();
var passport = require("passport");
var middleware = require("../middleware");



router.get("/blogAll", function (req, res) {
    res.render("blogAll");
});
//root route
router.get("/", function (req, res) {
    res.render("home");
});
//About route
router.get("/about", function (req, res) {
    res.render("about");
});
//Authentification route
//Show register form
router.get("/register", function (req, res) {
    res.render("register");
});
//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/propertyAll/new");
        });
    });
});
//Show login Form
router.get("/login", function (req, res) {
    res.render("login", {
        "error": "Войдите со своим логином!"
    });
});
//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/propertyAll",
    failureRedirect: "/login"
}), function (req, res) {});

//log out route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "Вы вышли из системы!");
    res.redirect("/");
});

module.exports = router;