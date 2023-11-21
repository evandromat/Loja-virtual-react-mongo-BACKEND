const mongoose = require("mongoose");


const CategorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      required:true
    },
  },
  {
    timstamps: true,
  }
);
const Cartegory = mongoose.model("Cartegory", CategorySchema);
module.exports = Cartegory;
