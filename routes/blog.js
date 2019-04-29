var express = require("express"),
    router = express.Router(),
    Blog = require("../models/blogSchema"),
    passport = require("passport"),
    middleware = require("../middleware")

// Seo meta tags
let blogSeo = {
    title: 'Новости, сайт, блог недвижимости, покупка, продажа квартир',
    description: 'Услуги риэлтора спб, продажа, покупка квартир, комнат, домов, новости рынка недвижимости, ипотеки, материнского капитала, новостроек, застройщиков.',
    keywords: 'недвижимость продажа, квартира, купить, посредник',
    author: 'Бацев Эдуард'
};



// Blog - show all properties
router.get("/blogAll", function (req, res) {
    Blog.find({}, function (err, allBlog) {
        if (err) {
            console.log(err);
        } else {
            res.render("./blog/blogAll", {
                blog: allBlog,
                title: blogSeo.title,
                description: blogSeo.description,
                keywords: blogSeo.keywords,
                author: 'Бацев Эдуард'
            });
        }
    });
});

// router.get("/blog", function (req, res) {
//     res.render("./blog/blog", blogSeo);
// });


// CREATE add new blog to the DB
router.post("/blogAll", function (req, res) {
    var mainHeader = req.body.mainHeader;
    var monthYear = req.body.monthYear;
    var nameAuthor = req.body.nameAuthor;
    var img1 = req.body.img1;
    var content = req.body.content;
    var newBlog = {
        mainHeader: mainHeader,
        monthYear: monthYear,
        nameAuthor: nameAuthor,
        img1: img1,
        content: content
    }
    Blog.create(newBlog, function (err, newlyBlog) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogAll");
        }
    });
});

// NEW - show form to create new Blog
router.get("/blogAll/blogNew", middleware.isLoggedIn, function (req, res) {
    res.render("./blog/blogNew", blogSeo);
});

// SHOW Blog
router.get("/blog/blogAll/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            console.log(err);
        } else {
            res.render("./blog/blog", {
                blog: foundBlog,
                title: blogSeo.title,
                description: blogSeo.description,
                keywords: blogSeo.keywords,
                author: 'Бацев Эдуард'
            });
        }
    });
});

//Edit Blog
router.get("/blog/blogAll/:id/blogEdit", function (req, res) {
    Blog.findById(req.params.id, function (err, foundProperty) {
        if (err) {
            console.log(err);
            res.redirect("./blog/blogAll", blogSeo);
        } else {
            res.render("./blog/blogEdit", {
                blog: foundProperty,
                title: blogSeo.title,
                description: blogSeo.description,
                keywords: blogSeo.keywords,
                author: 'Бацев Эдуард'
            });
        }
    });
});

router.put("/blog/blogAll/:id", function (req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            console.log(err);
        } else {
            let showUrl = "/blog/blogAll/" + req.params.id;
            res.redirect(showUrl);
        }
    });
});
//Edit Blog

//Delete Blog
router.delete("/blog/blogAll/:id", function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/blogAll");
        }
    });
});

module.exports = router;