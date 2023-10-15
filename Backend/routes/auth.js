const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  fogotPassword,
  resetPassword,
  getUserProfile,
  changePassword,
  updateProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/authController");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middleware/authenticate");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(fogotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/myprofile").get(isAuthenticatedUser, getUserProfile);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/update").put(isAuthenticatedUser, updateProfile);

// ADMIN ROUTES

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUser);
router
  .route("/admin/user/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser);
router
  .route("/admin/user/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
