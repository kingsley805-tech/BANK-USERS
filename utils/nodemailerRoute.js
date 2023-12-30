const express = require('express');
const router = express.Router();
const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

const transporter = nodemailer.createTransport({
  host:'mail.advertisinghub.online',
  port:465,
  secure:true,
  auth: {
    user:'admin@advertisinghub.online',
    pass:'Myfather123u'
  },

  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
},

from: 'admin@advertisinghub.online'
});


router.get('/verifyemail', async(req, res) => {
  let Info = req.query
  console.log(Info)
  let email = (Info.email).trim()
  let userId = (Info.userId).trim()
  let name= (Info.name).trim()
  
    const data = await ejs.renderFile(__dirname + "/test.ejs", { name:name, userId:userId, email:email });

    const mainOptions = {
      from: 'admin@advertisinghub.online',
      to: email,
      subject: 'Advertising hub new account confirmation',
      html: data
     };
    transporter.sendMail(mainOptions, (err, info) => {
    if (err) {
        console.log(err);
    } else {
       // console.log('Message sent: ' + info.response);
        res.render('verifymail', {name:name, email:email, userId:userId})
    }
    });
 })


 router.post('/verifyemail', async(req, res) => {
  let Info = req.body
  let email = (Info.email).trim()
  let userId = (Info.userId).trim()
  let name= (Info.name).trim()
    const data = await ejs.renderFile(__dirname + "/test.ejs", { name:name, userId:userId, email:email });

    const mainOptions = {
      from: 'admin@advertisinghub.online',
      to: email,
      subject: 'Advertising Hub new account confirmation',
      html: data
    };
    transporter.sendMail(mainOptions, (err, info) => {
    if (err) {
       res.json({Mes:'Sending Email Failed'})
    } else {
        console.log('Message sent: ' + info.response);
        res.json({Mes:'Confirmation email has been sent to the provided email'})
    }
    });
 })





 router.post('/testingformail', async(req, res) => {
  //console.log('hello')
  let email = 'benandoh1996@gmail.com'
  let userId = '809867'
  let name= 'Benjamin Andoh'
    const data = `Hi, ${name}, We are testing your email`;
    console.log('hello2')
    const mainOptions = {
      from: 'admin@advertisinghub.online',
      to: email,
      subject: 'Advertising Hub new account confirmation',
      html: data
    };
   // console.log('hello3')
    transporter.sendMail(mainOptions, (err, info) => {
    if (err) {
      //  console.log(err)
       // console.log('Sending Email Failed')
       res.json({Mes:'Sending Email Failed'})
    } else {

        console.log('Message sent: ' + info.response);
        res.json({Mes:'Confirmation email has been sent to the provided email'})
    }
    });
 })


module.exports = router;