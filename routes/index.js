var express = require("express");
var router = express.Router();
var passport = require("passport");

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
    res.render("login");
});
//handling login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/propertyAll",
    failureRedirect: "/login"
}), function (req, res) {});
//log out route
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/propertyAll");
});

// Add middleware function to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;