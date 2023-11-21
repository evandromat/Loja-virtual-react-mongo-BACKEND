const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../modells/userModel");
const Admin = require('../modells/adminModel')

const protectedRoute = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      res.status(403);
      // throw new Error("Não autorizado, por favor faça login");
    }
    //Verificando token
    const tokenValue = token.split(" ")[1];
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
   
    if (!verified) {
      res.status(401);
      // throw new Error("Usuário não encontrado");
    }
    // pegando token
    const user = await User.findById(verified.id).select("-password");
    // console.log(user)
    if (!user) {
      res.status(403);
      // throw new Error("Usuário não encontrado");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403);
    // throw new Error("Não autorizado, por favor faça login");
  }
});
const protectedRouteAdmim = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    
    if (!token) {
      res.status(403);
      throw new Error("Não autorizado, por favor faça login");
    }
    //Verificando token
    const tokenValue = token.split(" ")[1];
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET_KEY);
    
    if (!verified) {
      res.status(401);
      // throw new Error("Usuário não encontrado");
    }
    // pegando token
    const user = await Admin.findById(verified.id).select("-password");
    
    if (!user) {
      res.status(403);
      // throw new Error("Usuário não encontrado");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403);
    // throw new Error("Não autorizado, por favor faça login");
  }
});
const adminOnly = asyncHandler(async (req,res,next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    // throw new Error("não autorizado, somente administradores");
  }
});
module.exports = { protectedRoute, adminOnly,protectedRouteAdmim };
