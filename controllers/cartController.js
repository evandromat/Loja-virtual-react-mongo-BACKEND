const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Cart = require("../modells/cartModel");

const createCart = asyncHandler(async (req, res) => {
  const { userId, produtos } = req.body;

  //criando carrinho
  const cart = await Cart.create({
    userId,
    produtos,
  });
  res.status(201).json(cart);
});
// Get cart
const getCart = asyncHandler(async (req, res) => {
  const carts = await Cart.find().sort("-createdAt");

  res.status(200).json(carts);
});
// Get Single Cart
const getSingleCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if (!cart) {
    res.status(400);
    throw new Error("Carrinho não encontrado");
  }
  res.status(200).json(cart);
});

//Deletar carrinho
const deleteCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    res.status(400);
    throw new Error("Carrinho não encontrado");
  }
  await Cart.findByIdAndDelete(req.params.id);
  res.status(200).json({ messase: "Carrinho Deletado..." });
});
//Atualizar Carrrinho
const updateCart = asyncHandler(async (req, res) => {
  const { userId, produtos } = req.body;
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    res.status(400);
    throw new Error("Carrinho não encontrado");
  }
  const updateCart = await Cart.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      userId,
      produtos,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updateCart);
});

module.exports = {
  createCart,
  getCart,
  getSingleCart,
  deleteCart,
  updateCart,
};
