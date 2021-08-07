const User = require("../models/userModel");
const Message = require("../models/messageModel");
const { body, validationResult } = require("express-validator");

exports.member_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    // User cannot access the members form unless logged in
    return res.redirect("/log-in");
  }
  
  // else if (res.locals.currentUser.member) {
  //   // Redirect user to homepage if they are already a member
  //   return res.redirect("/");
  // }

  return res.render("member_form", { title: "Become a Member", user: res.locals.currentUser  });
};

exports.member_post = [
  body("passcode").trim().isLength({ min: 1 }).escape().withMessage("Passcode must be specified."),
  
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If there is an error submitting the member validation form, re-render the form with an error
      return res.render("member_form", { title: "Become a Member", user: res.locals.currentUser, errors: errors.array() });
    } else if (req.body.passcode !== "jojo") {
      return res.render("member_form", { title: "Become a Member", user: res.locals.currentUser, passcodeError: "Wrong Passcode" });
    }

    const user = new User(res.locals.currentUser);
    user.member = true;

    await User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  },
];

exports.create_message_get = (req, res, next) => {
  if (!res.locals.currentUser) {
    // Users not logged in cannot access "create a message page"
    return res.redirect("/log-in");
  }
  res.render("message_form", { title: "Create a Message", user: res.locals.currentUser });
};

exports.create_message_post = [
  body("messageTitle").trim().isLength({ min: 1 }).escape().withMessage("Title must not be empty"),
  body("messageText").trim().isLength({ min: 1 }).escape().withMessage("Text must not be empty"),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("message_form", { title: "Create a Message", errors: errors.array() });
    }

    const message = new Message({
      user: req.user._id,
      title: req.body.messageTitle,
      text: req.body.messageText,
      timestamp: Date.now()
    }).save((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  }
];