


const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../modells/adminModel");
const Codes = require('../modells/codesModel')

const generationToken = require("../midlleware/generationToken");

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, code } = req.body;

  //Validação
  if (!name || !email || !password || !code) {
    res.status(400).json({message:"Todos os campos são obrigatórios"});
    // throw new Error("Preencha os campos obrigatórios...");
  }
  if (password.length < 6) {
    res.status(400).json({message:"Senha deve ter no mínimo 6 caracteres"});
    // throw new Error("Senha deve ter no mínimo 6 caracteres");
  }
  // Verficar se usuário existe
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400).json({message:"Este email já esta cadastrado..."});
    // throw new Error("Este email já esta cadastrado...");
  }

  const codeIsvalid = await Codes.findOne({ code: code });
  if (!codeIsvalid) {
    res.status(400).json({message:"codigo inválido"});
    // throw new Error("Código inválido...");
  }

  // Encriptar Senha
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  //Criar Usuário
  const admin = await Admin.create({
    name,
    email,
    code,
    password: passwordHash,
  });
  // Gerando o Token
  const token = generationToken(admin._id);

  if (admin) {
    const { _id, name, email, code, photo } = admin;
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
      token,
    });
  } else {
    res.status(400).json({message:"Dados inválidos"});
    // throw new Error("Dados Inválidos");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  // const { emails:email, password } = req.body;

  //Validando a requisição
  if (!req.body.email || !req.body.password) {
    res.status(400).json({message:"Por favor digite email e senha"});
    // throw new Error("Por favor digite email e senha");
  }
  //Verificando se usuário existe
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) {
    res.status(400).json({message:"Usuário não encontrado..."});
    // throw new Error("Usuário não encontrado...");
  }
  // Se existir, verificar senha
  const passwordIsCorrect = await bcrypt.compare(
    req.body.password,
    admin.password
  );
  //Gerando token
  const token = generationToken(admin._id);
  if (admin && passwordIsCorrect) {
    const newUser = await Admin.findOne({ email: req.body.email }).select(
      "-password"
    );
    
    const { name, email, photo, _id } = newUser;
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
      .json({ name, email, photo,  _id, token: token });
  } else {
    res.status(400).json({message:"email ou senha inválido"});
    // throw new Error("email ou senha inválido");
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Saiu com sucesso..." });
});

// Buscar Usuário
const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user._id).select("-password");
  if (admin) {
    res.status(200).json(admin);
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
// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   if (user) {
//     const { name, phone, address } = user;
//     user.name = req.body.name || name;
//     user.phone = req.body.phone || phone;
//     user.address = req.body.address || address;

//     const updateUser = await user.save();
//     res.status(200).json(updateUser);
//   } else {
//     res.status(404);
//     throw new Error("usuário não encontrado");
//   }
// });

// const updatePhoto = asyncHandler(async (req, res) => {
//   const { photo } = req.body;
//   const user = await User.findById(req.user._id).select("-password");
//   user.photo = photo;
//   const updateUser = await user.save();
//   res.status(200).json(updateUser);
// });

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdmin,
  getLoginStatus,
//   updateAdmin,
//   updatePhoto,
};
