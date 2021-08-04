const User = require("../models/userModel");
const async = require("async");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.signup_get = (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
};

exports.signup_post = [
  body("username").trim().isLength({ min: 1 }).escape().withMessage("Username must be at least 6 characters.").isAlphanumeric().withMessage("Username has non-alphanumeric characters"),
	body("password").trim().isLength({ min: 1 }).escape().withMessage("Password must be at least 6 characters."),

  (req, res, next) => {
    async.parallel({
      someUser: function(cb) { User.find({ "username": req.body.username }).exec(cb) },
    }, (err, results) => {
      if (err) return next(err);
      // If the username already exists, re-render sign-up form
      if (!results) return res.render("signup", { title: "Sign Up" });
      // If username does not exist, continute to register to new user to db
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        const user = new User({
          username: req.body.username,
          password: hashedPassword,
          member: false,
          admin: false
        }).save(err => err ? next(err) : res.redirect("/"));
      });
    });
  }
];