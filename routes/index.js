var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");


// Seo meta tags
let homeSeo = {
    title: 'Продажа, покупка недвижимости, услуги риэлтора, посредника',
    description: 'Услуги риэлтора спб, продажа, покупка квартир, комнат, домов, новости рынка недвижимости, ипотеки, материнского капитала, новостроек, застройщиков.',
    keywords: 'недвижимость продажа, квартира, купить, посредник',
    author: 'Бацев Эдуард'
};
let aboutSeo = {
    title: 'Услуги риэлтора, посредника, обо мне',
    description: 'Услуги риэлтора спб, продажа, покупка квартир, комнат, домов, новости рынка недвижимости, ипотеки, материнского капитала, новостроек, застройщиков.',
    keywords: 'недвижимость продажа, квартира, купить, посредник',
    author: 'Бацев Эдуард'
};

//root route
router.get("/", function (req, res) {
    res.render("home", homeSeo);
});
//About route
router.get("/about", function (req, res) {
    res.render("about", aboutSeo);
});

//Authentification route
//Show register form
router.get("/register", function (req, res) {
    res.render("register", aboutSeo);
});
//handle sign up logic
router.post("/register", function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            // req.flash("error", "Выберите другой логин!")
            return res.render("register", {
                error: "Этот логин занят!",
                title: 'Услуги риэлтора, посредника, обо мне',
                description: 'Услуги риэлтора спб, продажа, покупка квартир, комнат, домов, новости рынка недвижимости, ипотеки, материнского капитала, новостроек, застройщиков.',
                keywords: 'недвижимость продажа, квартира, купить, посредник',
                author: 'Бацев Эдуард'
            })
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/propertyAll/new", homeSeo);
        });
    });
});
//Show login Form
router.get("/login", function (req, res) {
    res.render("login", {
        "error": "Войдите со своим логином!",
        title: homeSeo.title,
        description: homeSeo.description,
        keywords: homeSeo.keywords,
        author: 'Бацев Эдуард'
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