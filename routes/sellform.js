var express = require("express");
var nodemailer = require('nodemailer')
var router = express.Router();

// var User = require("../models/user");

//=======================================
//Show Sell form
router.get('/sell', (req, res, msg) => {
    res.render('sell', {
        msg: 'Продать'
    });
});
router.get('/buy', (req, res, msg) => {
    res.render('sell', {
        msg: 'Купить'
    });
});
//send mail
router.post('/sell', (req, res) => {
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



module.exports = router;
//Show Sell form
//=====================================