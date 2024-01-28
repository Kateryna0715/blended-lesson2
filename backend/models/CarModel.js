const { Schema, model } = require("mongoose");

const carSchema = new Schema({
  title: {
    type: String,
    required: [true, "Kate db_validation: title is required"],
  },
  model: {
    type: String,
    default: "Audi",
  },
  price: {
    type: Number,
    required: [true, "Kate db_validation: price is required"],
  },
  color: {
    type: String,
    default: "red",
  },
});

module.exports = model("car", carSchema);
