



const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
} = require("../controllers/userController");
const { protectedRoute } = require("../midlleware/authMidlleware");

router.post(
  "/register",
  // (req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Max-Age", "1800");
  //   res.setHeader("Access-Control-Allow-Headers", "content-type");
  //   res.setHeader(
  //     "Access-Control-Allow-Methods",
  //     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  //   );
  //   res.setHeader(
  //     "Access-Control-Allow-Headers",
  //     "Content-Type, x-requested-with"
  //   );
  //   res.setHeader("Access-Control-Allow-Credentials", "true");
  //   next();
  // },
  registerUser
);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protectedRoute, getUser);
router.get("/getLoginStatus", getLoginStatus);
router.patch("/updateUser", protectedRoute, updateUser);
router.patch("/updatePhoto", protectedRoute, updatePhoto);

module.exports = router;
