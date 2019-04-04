var express = require("express");
var router = express.Router();
var passport = require("passport");
var middleware = require("../middleware");

// Seo meta tags
let propertySeo = {
    title: 'Новости, сайт, блог недвижимости, покупка, продажа квартир',
    description: 'Услуги риэлтора спб, продажа, покупка квартир, комнат, домов, новости рынка недвижимости, ипотеки, материнского капитала, новостроек, застройщиков.',
    keywords: 'недвижимость продажа, квартира, купить, посредник',
    author: 'Бацев Эдуард'
};

// Blog route
router.get("/blogAll", function (req, res) {
    res.render("./blog/blogAll", propertySeo);
});
router.get("/blog", function (req, res) {
    res.render("./blog/blog", propertySeo);
});


module.exports = router;