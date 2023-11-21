const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../modells/userModel");
const generationToken = require("../midlleware/generationToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validação
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Todos os campos são requeridos...");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Senha deve ter no mínimo 6 caracteres");
  }
  // Verficar se usuário existe
  const usuerExists = await User.findOne({ email });
  if (usuerExists) {
    res.status(400);
    throw new Error("Este email já esta cadastrado...");
  }
  // Encriptar Senha
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  //Criar Usuário
  const user = await User.create({
    name,
    email,
    password: passwordHash,
  });
  // Gerando o Token
  const token = generationToken(user._id);

  if (user) {
    const { _id, name, email, role } = user;
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      secure: process.env.COOKIE_SEGURE,
      //   secure:true,
      //   sameSite:none
    });
    res.status(201).json({
      _id,
      name,
      email,
      role,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Dados Inválidos");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  // const { emails:email, password } = req.body;

  //Validando a requisição
  if (!req.body.email || !req.body.password) {
    res.status(400);
    throw new Error("Por favor digite email e senha");
  }
  //Verificando se usuário existe
  const user = await User.findOne({email:req.body.email});
  if (!user) {
    res.status(400);
    throw new Error("Usuário não encontrado...");
  }
  // Se existir, verificar senha
  const passwordIsCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  //Gerando token
  const token = generationToken(user._id);
  if (user && passwordIsCorrect) {
    const newUser = await User.findOne({email:req.body.email}).select("-password");
    
    const { name, email, photo, role, _id, address } = newUser;
    res
      .cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        secure: process.env.COOKIE_SEGURE,
        //   secure:true,
        //   sameSite:none
      })
      .status(201)
      .json({ name, email, photo, role, _id, address, token: token });
  } else {
    res.status(400);
    throw new Error("email ou senha inválido");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Saiu com sucesso..." });
});

// Buscar Usuário
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("Usuário não encontrado");
  }
});

const getLoginStatus = asyncHandler(async (req, res) => {
  const token = req.headers.token;
  if (!token) {
    return res.json(false);
  }
  //Verificar token
  const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
  if (verified) {
    res.json(true);
  } else {
    res.json(false);
  }
});
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    const { name, phone, address } = user;
    user.name = req.body.name || name;
    user.phone = req.body.phone || phone;
    user.address = req.body.address || address;

    const updateUser = await user.save();
    res.status(200).json(updateUser);
  } else {
    res.status(404);
    throw new Error("usuário não encontrado");
  }
});

const updatePhoto = asyncHandler(async (req, res) => {
  const { photo } = req.body;
  const user = await User.findById(req.user._id).select("-password");
  user.photo = photo;
  const updateUser = await user.save();
  res.status(200).json(updateUser);
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getLoginStatus,
  updateUser,
  updatePhoto,
};
