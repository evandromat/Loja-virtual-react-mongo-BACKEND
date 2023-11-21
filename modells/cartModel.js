


const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "Por favor adcionar um usuário"],
      trim: true,
    },
    produtos:{
        type:[Object]
    }
    
  },
  {
    timstamps: true,
  }
);
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
