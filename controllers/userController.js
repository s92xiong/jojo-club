const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

exports.member_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    // User cannot access the members form unless logged in
    return res.redirect("/log-in");
  }
  return res.render("member_form", { title: "Become a Member", user: res.locals.currentUser  });
};

exports.member_post = [
  body("passcode").trim().isLength({ min: 1 }).escape().withMessage("Passcode must be specified."),
  
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If there is an error submitting the member validation form, re-render the form with an error
      return res.render("member_form", { title: "Become a Member", user: res.locals.currentUser, errors: errors.array() });
    } else if (req.body.passcode !== process.env.MEMBER_PASSCODE) {
      return res.render("member_form", { title: "Become a Member", user: res.locals.currentUser, passcodeError: "Wrong Passcode" });
    }

    const user = new User(res.locals.currentUser);
    user.member = true;

    await User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
      if (err) return next(err);
      return res.redirect("/member");
    });
  },
];

exports.admin_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    // User cannot access the members form unless logged in
    return res.redirect("/log-in");
  }
  return res.render("admin_form", { title: "Become an Admin", user: res.locals.currentUser  });
};

exports.admin_post = [
  body("passcode").trim().isLength({ min: 1 }).escape().withMessage("Passcode must be specified."),
  
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If there is an error submitting the member validation form, re-render the form with an error
      return res.render("admin_form", { title: "Become an Admin", user: res.locals.currentUser, errors: errors.array() });
    } else if (req.body.passcode !== process.env.ADMIN_PASSCODE) {
      return res.render("admin_form", { title: "Become an Admin", user: res.locals.currentUser, passcodeError: "Wrong Passcode" });
    }

    const user = new User(res.locals.currentUser);
    user.admin = true;

    await User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  },
];