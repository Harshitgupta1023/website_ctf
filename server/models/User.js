const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: String,
    email: String,
    name: String,
    createdAt: String,
});

module.exports = model("User", userSchema);
