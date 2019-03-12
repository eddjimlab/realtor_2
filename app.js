var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    jquery = require('jquery'),
    // exphbs = require('express-handlebars'),
    // path = require('path'),
    nodemailer = require('nodemailer')
// multer = require("multer"),
// cloudinary = require("cloudinary"),
// upload = multer({ dest: 'uploads/' }),
// cloudinaryStorage = require("multer-storage-cloudinary"),
// fileUpload = require('express-fileupload')





mongoose.connect('mongodb://localhost/property', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //может надо удалить
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));


// View engine setup
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');


// Property Schema
var propertySchema = new mongoose.Schema({
    mainHeader: String,
    img: String,
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

var Property = mongoose.model("Property", propertySchema);


app.get("/", function (req, res) {
    res.render("home");
});



//Show Sell form
app.get('/sell', (req, res, msg) => {
    res.render('sell', { msg: 'Продать' });
});
app.get('/buy', (req, res, msg) => {
    res.render('sell', { msg: 'Купить' });
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
            pass: 'koker12345'  // generated ethereal password
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



app.get("/about", function (req, res) {
    res.render("about");
});

// Property - show all properties
app.get("/propertyAll", function (req, res) {
    Property.find({}, function (err, allProperty) {
        if (err) {
            console.log(err);
        } else {
            res.render("propertyAll", { property: allProperty });
        }

    });

});
// app.get("/property", function (req, res) {
//     Property.find({}, function (err, allProperty) {
//         if (err) {
//             console.log(err);
//         } else {
//             res.render("property", { property: allProperty });
//         }

//     });

// });

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
    var img = req.body.img;
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
        img: img,
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
app.get("/propertyAll/new", function (req, res) {
    res.render("new");
});



// SHOW property
app.get("/propertyAll/:id", function (req, res) {
    Property.findById(req.params.id, function (err, foundProperty) {
        if (err) {
            console.log(err);
        } else {
            res.render("property", { property: foundProperty });
        }
    });
});
// SHOW property

//File uploader
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });
// const storage = cloudinaryStorage({
//     cloudinary: cloudinary,
//     folder: "demo",
//     allowedFormats: ["jpg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }]
// });
// const parser = multer({ storage: storage });

// app.post('/api/images', parser.single("image"), (req, res) => {
//     console.log(req.file) // to see what is returned to you
//     const image = {};
//     image.url = req.file.url;
//     image.id = req.file.public_id;
//     Image.create(image) // save image information in database
//         .then(newImage => res.json(newImage))
//         .catch(err => console.log(err));
// });


//File uploader



// 
// default options
// app.use(fileUpload());

// app.post('/upload', function (req, res) {
//     if (Object.keys(req.files).length == 0) {
//         return res.status(400).send('No files were uploaded.');
//     }

//     // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//     let sampleFile = req.files.sampleFile;

//     // Use the mv() method to place the file somewhere on your server
//     sampleFile.mv('./upload', function (err) {
//         if (err)
//             return res.status(500).send(err);

//         res.send('File uploaded!');
//     });
// });
// 


//


// app.post('/uploads', upload.single('avatar'), function (req, res, next) {
//     // req.file - файл `avatar`
//     // req.body сохранит текстовые поля, если они будут
// })

// app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//     // req.files - массив файлов `photos`
//     // req.body сохранит текстовые поля, если они будут
// })

// var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// app.post('/cool-profile', cpUpload, function (req, res, next) {
//     // req.files - объект (String -> Array), где fieldname - ключ, и значение - массив файлов
//     //
//     // например:
//     //  req.files['avatar'][0] -> File
//     //  req.files['gallery'] -> Array
//     //
//     // req.body сохранит текстовые поля, если они будут
// })
//



app.listen(3000, function () {
    console.log("server started!!!");
});