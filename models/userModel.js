const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 35 },
  password: { type: String, required: true },
  member: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  avatar: { type: String , required: true, enum: ["jonathan", "joseph", "jotaro", "josuke", "giorno", "jolyne"], default: "jonathan" }
});

module.exports = mongoose.model("User", UserSchema);