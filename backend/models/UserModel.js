const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Kate db_validation: email is required"],
  },
  password: {
    type: String,
    required: [true, "Kate db_validation: password is required"],
  },
  name: {
    type: String,
    default: "Barbie",
  },
  token: {
    type: String,
    default: null,
  },
  roles: [
    {
      type: String,
      ref: "role",
    },
  ],
});

module.exports = model("user", userSchema);
