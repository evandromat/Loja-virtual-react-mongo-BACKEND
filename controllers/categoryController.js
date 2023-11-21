



const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Category = require("../modells/categoryModel");

const createCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;

  //criando carrinho
  const registerCategory = await Category.create({
    category
  });
  res.status(201).json(registerCategory);
});
// Get cart
const getCategory  = asyncHandler(async (req, res) => {
  const category   = await Category.find().sort("-createdAt");

  res.status(200).json(category);
});
// Get Single Cart
const getSingleCategory  = asyncHandler(async (req, res) => {
  const category  = await Category.findById(req.params.id);

  if (!category ) {
    res.status(400);
    throw new Error("Carrinho não encontrado");
  }
  res.status(200).json(category);
});

//Deletar carrinho
const deleteCategory  = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(400);
    throw new Error("Carrinho não encontrado");
  }
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ messase: "Carrinho Deletado..." });
});
//Atualizar Carrrinho
const updateCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;
  const categorys  = await Category.findById(req.params.id);
  if (!categorys ) {
    res.status(400);
    throw new Error("Carrinho não encontrado");
  }
  const updateCategory  = await Category.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
        category 
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updateCategory);
});

module.exports = {
  createCategory ,
  getCategory ,
  getSingleCategory ,
  deleteCategory ,
  updateCategory ,
};
