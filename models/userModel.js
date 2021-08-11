const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  member: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  avatar: { type: String , required: true, enum: ["jonathan", "joseph", "jotaro", "josuke", "giorno"], default: "jonathan" }
});

module.exports = mongoose.model("User", UserSchema);