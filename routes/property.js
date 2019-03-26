var express = require("express");
var router = express.Router();
var Property = require("../models/propertySchema");

// Property - show all properties
router.get("/propertyAll", function (req, res) {
    Property.find({}, function (err, allProperty) {
        if (err) {
            console.log(err);
        } else {
            res.render("propertyAll", {
                property: allProperty
            });
        }
    });

});
// CREATE add new properties to the DB
router.post("/propertyAll", function (req, res) {
    var mainHeader = req.body.mainHeader;
    var kitchen_S = req.body.kitchen_S;
    var living_S = req.body.living_S;
    var floor = req.body.floor;
    var address = req.body.address;
    var construction = req.body.construction;
    var rooms = req.body.rooms;
    var property_S = req.body.property_S;
    var metro = req.body.metro;
    var map = req.body.map;
    var description = req.body.description;
    var img1 = req.body.img1;
    var img2 = req.body.img2;
    var img3 = req.body.img3;
    var img4 = req.body.img4;
    var img5 = req.body.img5;
    var img6 = req.body.img6;
    var img7 = req.body.img7;
    var img8 = req.body.img8;
    var img9 = req.body.img9;
    var img10 = req.body.img10;
    var price = req.body.price;
    var newProperty = {
        mainHeader: mainHeader,
        kitchen_S: kitchen_S,
        living_S: living_S,
        floor: floor,
        address: address,
        construction: construction,
        rooms: rooms,
        property_S: property_S,
        metro: metro,
        map: map,
        description: description,
        img1: img1,
        img2: img2,
        img3: img3,
        img4: img4,
        img5: img5,
        img6: img6,
        img7: img7,
        img8: img8,
        img9: img9,
        img10: img10,
        price: price
    }
    Property.create(newProperty, function (err, newluProp) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/propertyAll");
        }
    });
});

// NEW - show form to create new property
router.get("/propertyAll/new", isLoggedIn, function (req, res) {
    res.render("new");
});

// SHOW property
router.get("/propertyAll/:id", function (req, res) {
    Property.findById(req.params.id, function (err, foundProperty) {
        if (err) {
            console.log(err);
        } else {
            res.render("property", {
                property: foundProperty
            });
        }
    });
});
// SHOW property

//Edit Property
router.get("/propertyAll/:id/edit", function (req, res) {
    Property.findById(req.params.id, function (err, foundProperty) {
        if (err) {
            console.log(err);
            res.redirect("/propertyAll");
        } else {
            res.render("edit", {
                property: foundProperty
            });
        }
    });
});

router.put("/propertyAll/:id", function (req, res) {
    Property.findByIdAndUpdate(req.params.id, req.body.property, function (err, updatedProperty) {
        if (err) {
            console.log(err);
        } else {
            let showUrl = "/propertyAll/" + req.params.id;
            res.redirect(showUrl);
        }
    });
});
//Edit Property

//Delete Property
router.delete("/propertyAll/:id", function (req, res) {
    Property.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/propertyAll");
        }
    });
});
// Add middleware function to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;