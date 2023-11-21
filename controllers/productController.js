const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Product = require("../modells/productModel");


const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    quantity,
    price,
    description,
    regularPrice,
    color,
    sold,
    images,
    sku
  } = req.body;

  if (!name || !brand || !quantity || !price || !description || !sku) {
    res.status(400).json({messageProduct:'por favor preencher todos os campos obrigatórios'});
    // throw new Error("por favor preencher todos os campos obrigatórios");
  }
  //criando produto
  const product = await Product.create({
    name,
    category,
    brand,
    quantity,
    price,
    description,
    regularPrice,
    color,
    sold,
    images,
    sku
  });
  res.status(201).json(product);
});
// Get Product
const getProduct = asyncHandler(async (req, res) => {
  const page = req.query.p || 0
  const productPorPage = 2
  // .skip(page * productPorPage).limit(productPorPage);
  const product = await Product.find().sort("-createdAt")

  res.status(200).json(product);
});
// Get Single Product
const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Produto não encontrado");
  }
  res.status(200).json(product);
});

//Deletar produto
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Produto não encontrado");
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ messase: "Produto Deletado..." });
});
//Atualizar Produto
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    brand,
    quantity,
    price,
    description,
    image,
    regularPrice,
    color,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Produto não encontrado");
  }
  const updateProduct = await Product.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      name,
      category,
      brand,
      quantity,
      price,
      description,
      image,
      regularPrice,
      color,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(updateProduct);
});

// reviews product

const reviewProduct = asyncHandler(async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;

  //validação
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("por favor adicionar um review");
  }
  const product = await Product.findById(id);

  if (!product) {
    res.status(400);
    throw new Error("Produto não encontrado");
  }

  product.ratings.push({
    star,
    review,
    reviewDate,
    userId: req.user._id,
  });
  product.save();
  res.status(200).json({ message: "Review Adcionado ao produto." });
});

//Delete review
const deleteReview = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(400);
    throw new Error("Produto não encontrado");
  }
  const newRatings = product.ratings.filter((rating) => {
    return rating.userId.toString() !== userId.toString();
  });
  product.ratings = newRatings;
  product.save();
  res.status(200).json({ message: "Review deletado..." });
});

//atualizar review
const updateReview = asyncHandler(async (req, res) => {
  const { star, review, reviewDate } = req.body;
  const { id } = req.params;
  const product = await Product.findById(id);
  //validação
  if (star < 1 || !review) {
    res.status(400);
    throw new Error("por favor adicionar um review");
  }
  if (!product) {
    res.status(400);
    throw new Error("Produto não encontrado");
  }
  // match user to review
  if (req.user._id.toString() !== userId) {
    res.status(401);
    throw new Error("usuário não encontrado");
  }
  // atualizar review
  const updateReview = await Product.findOneAndUpdate(
    {
      _id: product._id,
      "ratings.userId": mongoose.Types.ObjectId(userId),
    },
    {
      $set: {
        "ratings.$.star": star,
        "ratings.$.review": review,
        "ratings.$.reviewDate": reviewDate,
      },
    }
  );
  if (updateReview) {
    res.status(200).json({ message: "Review Atualizado..." });
  } else {
    res.status(400).json({ message: "Review não Atualizado..." });
  }
});

module.exports = {
  createProduct,
  getProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  reviewProduct,
  deleteReview,
  updateReview,
};
