const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProduct,
  reviewProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct,
  deleteReview,
  updateReview,
} = require("../controllers/productController");
const { adminOnly, protectedRoute } = require("../midlleware/authMidlleware");

// router.post("/", adminOnly, createProduct);
router.post("/cad-produto",  createProduct);
router.get("/getProducts", getProduct);
router.get("/:id", getSingleProduct);
router.delete("/:id", protectedRoute, adminOnly, deleteProduct);
router.patch("/:id", protectedRoute, adminOnly, updateProduct);
router.patch("/review/:id", protectedRoute, reviewProduct);
router.patch("/deleteReview/:id", protectedRoute, adminOnly, deleteReview);
router.patch("/updateReview/:id", protectedRoute, adminOnly, updateReview);

module.exports = router;
