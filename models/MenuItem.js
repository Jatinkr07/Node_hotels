const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  restaurant: {
    type: String,
    enum: ["Punjabi Tadka", "Food Buff", "KFC", "MCD"],
    required: true,
  },

  taste: {
    type: String,
    enum: ["Spicy", "Sweet", "normal"],
    required: true,
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

const menuItem = mongoose.model("menuItem", menuItemSchema);
module.exports = menuItem;
