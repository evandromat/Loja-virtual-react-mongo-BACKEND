const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParse = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoute");
const adminRoutes = require("./routes/adminRoutes");
const CategoryRoutes = require("./routes/categoryRoutes");
const errorHandler = require("./midlleware/errorMidlleware");
const { adminOnly } = require("./midlleware/authMidlleware");

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
  res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  app.use(cors());
  next();
});

app.use(express.json());
app.use(cookieParse());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use("/api/users/", userRoutes);
app.use("/api/product/",  productRoutes);
app.use("/api/cart/",  cartRoutes);
app.use("/api/admin/",  adminRoutes);
app.use("/api/category/",  CategoryRoutes);
// app.use("/api/product/", adminOnly, productRoutes);


mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("conectado ao banco de dados... ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
