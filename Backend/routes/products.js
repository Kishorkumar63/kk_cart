const express=require("express");
const { getProducts, newProduct, getSinglePrdouct, updateProduct, deletePrdouct } = require("../controller/productController");
const router=express.Router();



router.route("/products").get(getProducts)
router.route("/product/new").post(newProduct)
router.route("/product/:id").get(getSinglePrdouct)
router.route("/product/:id").put(updateProduct)
router.route("/product/:id").delete(deletePrdouct)


module.exports= router;