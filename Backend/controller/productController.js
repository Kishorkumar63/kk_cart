const Product = require("../model/productModel");
const errrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const apiFeatures = require("../utils/apiFestures");

//GEPT PRODUCT   /api/v1/
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3;
  const APIFeatures = new apiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .paginate(resPerPage);
  let buildQuery = () => {
    return new apiFeatures(Product.find(), req.query).search().filter();
  };
  const filterProductCount = buildQuery().query.countDocuments({});
  const products = await buildQuery().paginate(resPerPage).query;
  // const products = await apifeatures.query;
  const totalProductCount = await Product.countDocuments({});
  let productsCount = totalProductCount;
  // if (filterProductCount != totalProductCount) {
  //   productsCount = filterProductCount;
  // }

  await new Promise((resolve) => setTimeout(resolve, 3000));
  //return next(new errrorHandler("Unable To Send Products!",400))
  res.json({
    sucess: "success",
    count: productsCount,
    resPerPage,
    products,
  });
});
exports.newProduct = async (req, res) => {
  req.body.user = req.user.id;
  const prdouct = await Product.create(req.body);
  res.status(201).json({
    Sucess: ["Product Save", true],
    product,
  });
};

//GET SINGLEPRODUCT  /api/v1/
exports.getSinglePrdouct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new errrorHandler("product not Found ", 400));
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));
  res.status(201).json({
    success: true,
    product,
  });
};

// UPDATE PRODUCT /api/v1/
exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product Not Found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    product,
  });
};

exports.deletePrdouct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product Not Found",
    });
  }
  await product.remove();
  res.status(201).json({
    success: true,
    message: "Product Deleted",
  });
};
