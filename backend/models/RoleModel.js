const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  title: {
    type: String,
    default: "USER",
  },
});

module.exports = model("role", roleSchema);
