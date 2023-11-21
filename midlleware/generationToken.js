const jtw = require("jsonwebtoken");

const generationToken = (id) => {
  return jtw.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};
module.exports = generationToken;
