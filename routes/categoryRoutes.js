


const express = require("express");
const router = express.Router();
const {
    createCategory ,
    getCategory ,
    getSingleCategory ,
    deleteCategory ,
    updateCategory ,
} = require("../controllers/categoryController");
// const { adminOnly, protectedRoute } = require("../midlleware/authMidlleware");

// router.post("/", adminOnly, createProduct);
router.post("/",  createCategory);
router.get("/", getCategory);
router.get("/:id", getSingleCategory);
router.delete("/:id",  deleteCategory);
router.patch("/:id", updateCategory);


module.exports = router;
