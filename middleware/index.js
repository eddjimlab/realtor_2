// var Property = require("../models/propertySchema");

// Add middleware function to check if user is logged in
var middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Пожалуйста войдите!");
    res.redirect("/login");
}

module.exports = middlewareObj;