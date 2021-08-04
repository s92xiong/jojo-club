const User = require("../models/userModel");

exports.signup_get = (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
};