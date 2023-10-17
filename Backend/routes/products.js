const express = require("express");
const {
  getProducts,
  newProduct,
  getSinglePrdouct,
  updateProduct,
  deletePrdouct,
} = require("../controller/productController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authenticate");
const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/product/:id").get(isAuthenticatedUser, getSinglePrdouct);
router.route("/product/:id").put(isAuthenticatedUser, updateProduct);
router.route("/product/:id").delete(isAuthenticatedUser, deletePrdouct);

module.exports = router;
