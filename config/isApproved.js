const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function isApproved(req, res, next) {
    if (req.user.Status === 'Approved') {
      return next();
    }else{
        res.redirect('/account-blocked');
    }
    
  }


  module.exports = {
    isApproved
  }