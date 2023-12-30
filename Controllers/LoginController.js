const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {LoginEmailCheck, saveOtpCode, deleteOtpCode, verifyOtpCode} = require('../Models/LoginModels')
const {LoginAlerts, SendTwoFactorCode} = require('../utils/email.util')



async function newLogin(req, res, next) {
    try {
        passport.use(
        new LocalStrategy({ usernameField: 'Email', passwordField:'password' }, async(Email, password, done) => { 
         let emailCheck = await LoginEmailCheck(Email);
        // console.log(emailCheck)
         if(emailCheck.results.length === 0){
           return done(null, false, { message: 'Email does not exist' })
         }


         let user = emailCheck.results[0]
         //console.log(user)
         bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                let EmailInfo = {FirstName:user.FirstName, LastName:user.LastName, inputEmail:user.inputEmail, IPAdress:req.body.IPAdress, City:req.body.City, Country:req.body.Country, Today: new Date().toDateString()};
                 LoginAlerts(EmailInfo)
                return done(null, user);
            } else {
               //console.log('User password incorrect')
                return done(null, false, { message: 'Password incorrect' });
            }

        })

        })
        )

        passport.serializeUser(function(user, cb) {
            process.nextTick(function() {
              return cb(null, {
                FirstName: user.FirstName,
                LastName: user.LastName,
                Telephone: user.Telephone,
                inputEmail:user.inputEmail,
                AccountID:user.AccountID,
                Account_Number:user.Account_Number,
                Status:user.Status,
                wordDate:user.wordDate,
                Account_Type:user.Account_Type,
                Address: user.Address,
                City:user.City,
                Region:user.Region,
                Country:user.Country,
                verify_email:user.verify_email
              });
            });
          });
          
    
          passport.deserializeUser(function(user, cb) {
            process.nextTick(function() {
              return cb(null, user);
            });
          });
    
    
        passport.authenticate('local', {
           // successRedirect: `/determine-status`,
            successRedirect: `/determine-status`,
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    
    
    } catch (error) {
        console.error(error);
    }
}


const twoFactorAuth = async(req, res) => {

     let inputEmail = req.user.inputEmail;

     let Code = GenerateIndex();

     let FirstName = req.user.FirstName;

     let LastName = req.user.LastName;

     let Datatwo = {inputEmail, Code, FirstName, LastName};

     let Data = {inputEmail, Code, Time:new Date().getMinutes()};

     await deleteOtpCode(inputEmail)

     await saveOtpCode(Data);

     await SendTwoFactorCode(Datatwo);

     req.flash('wrongOtp', 'Wrong Otp');
     req.flash('expiredOtp', 'The Otp entered is expired');
     res.render('otpverification', {inputEmail});
}


const VerifyOTPCode = async(req, res) => {
   try {
   
        let inputEmail = req.user.inputEmail
        const digit1 = (req.body.digit1).trim()
        const digit2 = (req.body.digit2).trim()
        const digit3 = (req.body.digit3).trim()
        const digit4 = (req.body.digit4).trim()
        let Code = digit1+''+digit2+''+digit3+''+digit4;

        let otp = await verifyOtpCode(inputEmail, Code);
       
       
        if(!otp){
          const wrongOtp = req.flash('wrongOtp')
           res.render('otpverification', {wrongOtp})
        }else{
          let cTime = new Date().getMinutes()
          let otpTime = Number(otp.Time)
          var time 
          let diff = cTime - otpTime
          if(diff < 0){
           time = 0-diff
          }else{
            time = diff
          }
 
          if(time > 5){
            await deleteOtpCode(inputEmail)
            const expiredOtp = req.flash('expiredOtp')
             res.render('otpverification', {expiredOtp})
          }else{
             res.redirect('/determine-status')
          }
           
        }
   } catch (error) {
    console.log(error)
          const failMessage = req.flash('Can verify otp')
           res.render('otpverification', {failMessage})
   }
}

const Logout = (req, res) => {
  req.logout();
  res.redirect('/login');
}


let GenerateIndex = () =>{
  const min = 1000;
  const max = 9999;
 return Math.floor(Math.random() * (max - min + 1) + min);

}

module.exports = {
    newLogin,
    Logout,
    twoFactorAuth, 
    VerifyOTPCode
}


