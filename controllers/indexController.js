const Message = require("../models/messageModel");

exports.index = async (req, res, next) => {
  try {
    const messages = await Message.find().sort([["name", "ascending"]]);
    return res.render('index', { title: 'Members Only', user: req.user, messages: messages });
  } catch (err) {
    return next(err);
  }
};