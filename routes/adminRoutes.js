const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdmin,
  getLoginStatus,
} = require("../controllers/adminController");
const { protectedRoute,protectedRouteAdmim } = require("../midlleware/authMidlleware");

router.post(
  "/register-admin",
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
  registerAdmin
);
router.post("/login-admin", loginAdmin);
router.get("/logout-admin", logoutAdmin);
router.get("/getAdmin", protectedRouteAdmim, getAdmin);
router.get("/getLoginStatus", getLoginStatus);
// router.patch("/updateAdmin", protectedRoute, updateUser);
// router.patch("/updatePhoto", protectedRoute, updatePhoto);

module.exports = router;
