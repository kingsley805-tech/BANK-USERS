const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
       if(req.user.verify_email === 'Yes'){
         if(req.user.Status === 'Approved'){
          return next();
         }else{
          res.redirect('/account-blocked');
         }
       }else{
         res.redirect('/verify-email')
       }
     
    }else{
       res.redirect('/login');
    }
   
  }


  module.exports = {
    isAuthenticated
  }