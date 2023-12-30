const express = require('express');
const router = express.Router();
// const fs = require("fs");
// const nodemailer = require("nodemailer");
// const ejs = require("ejs");
// const { text } = require('express');

// const transporter = nodemailer.createTransport({
//   host:'mail.procoding.solutions',
//   port:465,
//   secure:true,
//   auth: {
//     user:'info@procoding.solutions',
//     pass:'Myfather123@u'
//   },

//   tls: {
//     // do not fail on invalid certs
//     rejectUnauthorized: false
// },

// });


// router.post('/registration-sendemail', async(req, res) => {
//     let Data = req.body
//     //console.log(req.body)
//     const data = await ejs.renderFile(__dirname + "/test.ejs", {Data:Data});
//     const mainOptions = {
//       from: 'Procoding Bootcamp <info@procoding.solutions>',
//       to: Data.inputEmail,
//       subject: 'Procoding Bootcamp - Login details',
//       html: data,
//       text: 'Welcome Message with login details'
//     };
//     transporter.sendMail(mainOptions, (err, info) => {
//     if (err) {
//         console.log(err);
//     } else {
//         //console.log('Message sent: ' + info);
//         res.json({Mes:'Message sent'})
//     }
//     });
//  })


//  router.get('/registration-sendemail', async(req, res) => {
//     let Data = req.query
//     //console.log(Data)
//     const data = await ejs.renderFile(__dirname + "/test.ejs", {Data:Data});
//     const mainOptions = {
//       from: 'Procoding Bootcamp <info@procoding.solutions>',
//       to: Data.inputEmail,
//       subject: 'Procoding Bootcamp - Login details',
//       html: data,
//       text: 'Welcome Message with login details'
//     };
//     transporter.sendMail(mainOptions, (err, info) => {
//     if (err) {
//         res.redirect(`/registration-success?FirstName=${Data.FirstName}&inputEmail=${Data.inputEmail}&indexNumber=${Data.indexNumber}`)
//     } else {
//         //console.log('Message sent: ' + info.response);
//         res.redirect(`/registration-success?FirstName=${Data.FirstName}&inputEmail=${Data.inputEmail}&indexNumber=${Data.indexNumber}`)
//     }
//     });
//  })


 module.exports = router