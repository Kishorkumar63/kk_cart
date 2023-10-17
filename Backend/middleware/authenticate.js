const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  //token will expire checking method
  if (!token) {
    return next(ErrorHandler("Login First to Handle This Resource"));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role) == "admin") {
      return next(new ErrorHandler(`Role ${req.user.role} Not Allowed`, 401));
    }
    next();
  };
};
