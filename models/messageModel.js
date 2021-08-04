const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 50 },
  text: { type: String, required: true, maxLength: 1000 },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model("Message", MessageSchema);