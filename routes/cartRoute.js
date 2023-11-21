


const express = require("express");
const router = express.Router();
const {
  createCart,
  getCart,
  updateCart,
  getSingleCart,
  deleteCart,
} = require("../controllers/cartController");
// const { adminOnly, protectedRoute } = require("../midlleware/authMidlleware");

// router.post("/", adminOnly, createProduct);
router.post("/",  createCart);
router.get("/", getCart);
router.get("/:id", getSingleCart);
router.delete("/:id",  deleteCart);
router.patch("/:id", updateCart);


module.exports = router;
