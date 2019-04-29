var mongoose = require("mongoose");

// Blog Schema
var blogSchema = new mongoose.Schema({
    mainHeader: String,
    monthYear: String,
    nameAuthor: String,
    img1: String,
    content: String
});

module.exports = mongoose.model("Blog", blogSchema);