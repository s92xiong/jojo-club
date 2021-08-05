const User = require("../models/userModel");
const async = require("async");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.signup_get = (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
};

exports.signup_post = [
  body("username").trim().isLength({ min: 1 }).escape().withMessage("Username must be at least 6 characters."),
	body("password").trim().isLength({ min: 1 }).escape().withMessage("Password must be at least 6 characters."),
  body("confirmPassword").trim().isLength({ min: 1 }).escape().withMessage("Password must be at least 6 characters.")
    .custom(async (value, { req }) => {
      if (value !== req.body.password) throw new Error('Passwords must be the same');
      return true;
    }),

  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("ERROR!");
      return res.render("signup", { title: "Sign Up", passwordConfirmationError: "Passwords must be the same" });
    }

    async.parallel({
      // Check to see if username is already taken
      someUser: function(cb) { User.find({ "username": req.body.username }).exec(cb) },
    }, (err, results) => {
      if (err) return next(err);
      // If the username is taken, re-render sign-up form with an error message ("results" returns an array)
      if (results.someUser.length > 0) return res.render("signup", { title: "Sign Up", error: "User already exists" });
      // If username does not exist, continute to register new user to db
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