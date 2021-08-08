const Message = require("../models/messageModel");

exports.index = async (req, res, next) => {
  try {
    // Populate message with "user" information (reference to user in model)
    const messages = await Message.find().sort([["timestamp", "descending"]]).populate("user");
    return res.render('index', { title: 'Members Only', user: req.user, messages: messages });
  } catch (err) {
    return next(err);
  }
};