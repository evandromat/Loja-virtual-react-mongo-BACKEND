const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const adminSchema = mongoose.Schema({
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
  photo: {
    type: String,
    required: [true, "Por favor adcionar foto"],
    default: "https://i.ibb.co/4pDNDk1/avatar.png",
  },
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
