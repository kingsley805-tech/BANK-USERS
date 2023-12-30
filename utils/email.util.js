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
  
  from: 'info@aussie-investment.com'
  });


  const emailVerification = async(Data) => {
     try {
        let email = (Data.inputEmail).trim()
         const data = await ejs.renderFile(__dirname + "/verifyemail.ejs", {Data});

         const mainOptions = {
            from: 'Aussie Investments <info@treasury-investment.com>',
            to: email,
            subject: 'Aussies Trust Financial Management account verification needed',
            html: data
           };

           transporter.sendMail(mainOptions, (err, info) => {
            if (err) {
                console.log(err);
            }else{
                return
            }
            });

     } catch (error) {
               console.log(error);
     }
  }


  const TransactionEmailAlerts = async(Data) => {
    try {
       let email = (Data.inputEmail).trim()
        const data = await ejs.renderFile(__dirname + "/transaction.ejs", {Data});

        const mainOptions = {
           from: 'Aussie Investments <info@aussie-investment.com>',
           to: email,
           subject: `${Data.Subject}`,
           html: data
          };

          transporter.sendMail(mainOptions, (err, info) => {
           if (err) {
               console.log(err);
           }else{
               return
           }
           });

    } catch (error) {
              console.log(error);
    }
 }


 const LoginAlerts = async(Data) => {
  try {
     let email = (Data.inputEmail).trim()
      const data = await ejs.renderFile(__dirname + "/login.ejs", {Data});

      const mainOptions = {
         from: 'Aussie Investment <info@aussie-investment.com>',
         to: email,
         subject: `Login notification alert`,
         html: data
        };

        transporter.sendMail(mainOptions, (err, info) => {
         if (err) {
             console.log(err);
         }else{
             return
         }
         });

  } catch (error) {
            console.log(error);
  }
}


const ResetPasswordLink = async(Data) => {
  try {
     let email = (Data.inputEmail).trim()
      const data = await ejs.renderFile(__dirname + "/passwor.ejs", {Data});

      const mainOptions = {
         from: 'Aussie Investment <info@aussie-investment.com>',
         to: email,
         subject: `Reset Password Link`,
         html: data
        };

        transporter.sendMail(mainOptions, (err, info) => {
         if (err) {
             console.log(err);
         }else{
             return
         }
         });

  } catch (error) {
            console.log(error);
  }
  }


  const SendTwoFactorCode = async(Data) => {
    try {
       let email = (Data.inputEmail).trim()
        const data = await ejs.renderFile(__dirname + "/otpveify.ejs", {Data});
  
        const mainOptions = {
           from: 'Aussie Investment <info@aussie-investment.com>',
           to: email,
           subject: `OTP Verification Code`,
           html: data
          };
  
          transporter.sendMail(mainOptions, (err, info) => {
           if (err) {
               console.log(err);
           }else{
               return
           }
           });
  
    } catch (error) {
              console.log(error);
    }
    }

  module.exports = {
    emailVerification,
    TransactionEmailAlerts,
    LoginAlerts,
    ResetPasswordLink,
    SendTwoFactorCode

  }