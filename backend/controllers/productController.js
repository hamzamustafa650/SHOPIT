const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");

//create new Product => api/v1/product/new
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
    message: "this route will shows all product in database.",
  });
};

exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id,function (err, docs) {
    if (err){
        return res.status(404).json({
            success: false,
            message: "Product not Found",
          });
    }

});
res.status(200).json({
    success: true,
    product,
  });
 
};

exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product Not found",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
};
