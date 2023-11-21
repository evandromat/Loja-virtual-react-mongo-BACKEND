const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const codesSchema = mongoose.Schema({
  code: {
    type:String,
    required: true,
  }
  
});
const Codes = mongoose.model("Codes", codesSchema);
module.exports = Codes;
