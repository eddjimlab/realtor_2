var mongoose = require("mongoose");

// Property Schema
var propertySchema = new mongoose.Schema({
    mainHeader: String,
    img1: String,
    img2: String,
    img3: String,
    img4: String,
    img5: String,
    img6: String,
    img7: String,
    img8: String,
    img9: String,
    img10: String,
    kitchen_S: Number,
    living_S: Number,
    floor: Number,
    address: String,
    construction: String,
    rooms: Number,
    property_S: Number,
    metro: String,
    map: String,
    description: String,
    price: String
});

module.exports = mongoose.model("Property", propertySchema);