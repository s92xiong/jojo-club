const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/userModel");
const bcrypt = require("bcryptjs");
const session = require("express-session"); // Dependency of passport.js
const compression = require("compression"); // Decrease the size of the response body and hence increase the speed of a web app
const helmet = require("helmet"); // Protects app from web vulnerabilities by setting HTTP headers appropriately

// Establish database connection
const mongoose = require("mongoose");
// const dev_db_url = process.env.process.env.MONGODB_URI
// const mongoDB = process.env.MONGODB_URI || dev_db_url;
const mongoDB = process.env.MONGODB_URI
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Import routes
const indexRouter = require('./routes/routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // Compress all routes
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: "Incorrect username" });
    bcrypt.compare(password, user.password, (err, res) => {
      if (err) return done(err);
      // Passwords match, log user in!
      if (res) return done(null, user);
      // Passwords do not match!
      else return done(null, false, { message: "Incorrect password" });
    });
  });
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

// Secret value should be a process env value
app.use(session({ secret: "jojo", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Access the user object from anywhere in our application
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
