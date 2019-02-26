var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function (req, res) {
    res.render("home");
});

app.get("/about", function (req, res) {
    res.render("about");
});
app.get("/property", function (req, res) {
    res.render("property");
});

app.listen(3000, function () {
    console.log("server started!!!");
})