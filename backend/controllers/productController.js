const Product = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const APIFeatures = require('utils/apiFeatures');



//create new Product => api/v1/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  
  
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
})


exports.getProducts = catchAsyncErrors( async (req, res, next) => {
  
  
  const apiFeatures = new APIFeatures(Product.find(),req.query)
                                            .search()
  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    count: products.length,
    products,
    message: "this route will shows all product in database.",
  });
});

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id,function (err, docs) {
    if (err){
        return next(new ErrorHandler('Product not found',404));
    }

});
res.status(200).json({
    success: true,
    product,
  });
 
});

exports.updateProduct =catchAsyncErrors( async (req, res, next) => {
  let product = await Product.findById(req.params.id,function (err, docs) {
    if (err){
      return next(new ErrorHandler('Product not found',404));
    }

});
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsyncErrors( async (req, res, next) => {
  const product = await Product.findById(req.params.id,function (err, docs) {
    if (err){
      return next(new ErrorHandler('Product not found', 404));
    }

});
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
});
