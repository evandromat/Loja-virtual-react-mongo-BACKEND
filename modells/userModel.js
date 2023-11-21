const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor digitar seu nome"],
  },
  email: {
    type: String,
    required: [true, "Por favor digite seu email"],
    trim: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi,
      "Por favor digite um email válido",
    ],
  },
  password: {
    type: String,
    required: [true, "Por favor digite uma senha"],
    minLenhth: [6, "Mínimo 6 caracteres"],
  },
  role: {
    type: String,
    required: true,
    default: "admin",
    enum: ["cliente", "admin"],
  },
  photo: {
    type: String,
    required: [true, "Por favor adcionar foto"],
    default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
  phone: {
    type: String,
  },
  address: {
    type: Object,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
