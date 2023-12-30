require("dotenv").config();

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cookie = require('cookie-parser')
const flash = require('connect-flash')
const expressLayouts = require('express-ejs-layouts')
const localstrategy = require('passport-local').Strategy
const http = require('http');
const ejs = require('ejs')
const crypto = require('crypto')
var favicon = require('serve-favicon');


var app = express();

const router = express.Router()


//app.use(enforce.HTTPS({ trustProtoHeader: true }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false, limit: '25mb'}));

app.use(bodyParser.json({
    sameSite: 'strict',
    secure: true,
}))
//express session
app.use(cookie())
app.use(session({
    secret: 'keyboard cat',
    sameSite: 'strict',
    resave: true,
    secure: true,
    saveUninitialized: true,
    cookie: {
        maxAge: (1000*60*60*24)*180 //180 days
    }
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//conect flash
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error')
    next();
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/logo/tfblogo.png.jpeg'))

//Using require pages
app.use('/', require('./routes/user'));
app.use('/', require('./routes/index'));
app.use('/', require('./routes/Admin'));
app.use('/', require('./routes/mainRoute'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
   console.log(err)
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;