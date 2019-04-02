var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    multer = require("multer"),
    path = require("path"),
    // Property = require("./models/propertySchema"),
    User = require("./models/user"),
    // nodemailer = require('nodemailer')
    cloudinary = require("cloudinary")
// cloudinaryStorage = require("multer-storage-cloudinary"),
// fileUpload = require('express-fileupload')

var sellformRoutes = require("./routes/sellform"),
    indexRoutes = require("./routes/index"),
    propertyRoutes = require("./routes/property"),
    blogRoutes = require("./routes/blog")



mongoose.connect('mongodb://localhost/property', {
    useNewUrlParser: true
});
app.set("view engine", "ejs");
// app.use(express.static("views"));
app.set('views', path.join(__dirname, 'views/'));
app.use(express.static(__dirname + "/public")); //болле безопасный вариант указания пути
// console.log(__dirname);
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); //может надо удалить
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(flash());

//Passport Configuration
app.use(require("express-session")({
    secret: "This is a secret page example...",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//add middleware check Current User for every routes
app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});







// File storage Multer
//=========================================
//Set storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads1',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
});


//Init upload
const upload = multer({
    storage: storage
    // ,
    // limits: { fileSize: 800000 }, //800 kBites
    // fileFilter: function (req, file, cb) {
    //     checkFileType(file, cb);
    // }
}).array('photos', 6);


//Check file Type
function checkFileType(file, cb) {
    //Alowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only');
    }
}

//Upload - show
app.get("/upload", function (req, res) {
    res.render("upload");
});


//Add POST route fore Image uploads
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        let filenames = req.files.map(({
            filename
        }) => filename);
        if (err) {
            res.render('new', {
                msg: err
            });
        } else {
            if (req.files == undefined) {
                res.render('new', {
                    msg: 'Error: No File Selected'
                });
            } else {
                res.render('new', {
                    filenames: filenames
                });
            }
        }
    });
});
//=======================





app.use(indexRoutes);
app.use(propertyRoutes);
app.use(sellformRoutes);
app.use(blogRoutes);


const port = 3000;
app.listen(port, () =>
    console.log(`server started on port: ${port}`));