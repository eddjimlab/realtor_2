var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    multer = require("multer"),
    path = require("path"),
    Property = require("./models/propertySchema"),
    User = require("./models/user"),
    nodemailer = require('nodemailer')
// cloudinary = require("cloudinary"),
// cloudinaryStorage = require("multer-storage-cloudinary"),
// fileUpload = require('express-fileupload')





mongoose.connect('mongodb://localhost/property', {
    useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static(__dirname + "/public")); //болле безопасный вариант указания пути
// console.log(__dirname);
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); //может надо удалить
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

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
    next();
});


app.get("/", function (req, res) {
    res.render("home");
});



//Show Sell form
app.get('/sell', (req, res, msg) => {
    res.render('sell', {
        msg: 'Продать'
    });
});
app.get('/buy', (req, res, msg) => {
    res.render('sell', {
        msg: 'Купить'
    });
});
//send mail
app.post('/sell', (req, res) => {
    console.log(req.body);
    const output = `
        <p>У вас новый запрос с сайта </p>
        <h3>Данные контакта</h3>
        <ul>  
          <li>Имя: ${req.body.name}</li>
          <li>Компания: ${req.body.company}</li>
          <li>Email: ${req.body.email}</li>
          <li>Телефон: ${req.body.phone}</li>
        </ul>
        <h3>Сообщение</h3>
        <p>${req.body.message}</p>
      `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'eduardbut67@yandex.ru', // generated ethereal user
            pass: 'koker12345' // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"My Home gold Team realtor" <eduardbut67@yandex.ru>', // sender address
        to: 'eddjimlab@gmail.com', // list of receivers
        subject: 'Запрос c сайта о продаже недвижимости', // Subject line
        text: 'Новое сообщение с сайта', // plain text body
        html: output, // html body

    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('modal');
    });
});

//Show Sell form


//Show About
app.get("/about", function (req, res) {
    res.render("about");
});


// Property - show all properties
app.get("/propertyAll", function (req, res) {
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

app.post("/propertyAll", function (req, res) {
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
app.get("/propertyAll/new", isLoggedIn, function (req, res) {
    res.render("new");
});



// SHOW property
app.get("/propertyAll/:id", function (req, res) {
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
app.get("/propertyAll/:id/edit", function (req, res) {
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

app.put("/propertyAll/:id", function (req, res) {
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


// app.delete("/propertyAll/:id", function (req, res) {
//     res.send("You are trying to delete something");
// });

app.delete("/propertyAll/:id", function (req, res) {
    Property.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/propertyAll");
        }
    });
});
//Delete Property



//Set storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads',
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
}).array('myImage', 6);


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

//Add POST route fore Image uploads
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        let filenames = req.files.map(({
            filename
        }) => filename);
        console.log(filenames);
        // console.log(req.files.map(({ filename }) => filename));
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
                // res.render('new', {
                //     msg: 'File Uploaded',
                //     files: `uploads/${filenames}`
                // });
                // console.log(req.files);
                // console.log(req.files.filename);
                // console.log(this.filename);

            }
        }
        console.log(filenames);



    });
});

//========================
// Auth Routhes
//========================

//Show register form
app.get("/register", function (req, res) {
    res.render("register");
});
//handle sign up logic
app.post("/register", function (req, res) {
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
app.get("/login", function (req, res) {
    res.render("login");
});
//handling login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/propertyAll",
    failureRedirect: "/login"
}), function (req, res) {});
//log out route
app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/propertyAll");
});

//Add middleware function to check if user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


const port = 3000;
app.listen(port, () =>
    console.log(`server started on port: ${port}`));