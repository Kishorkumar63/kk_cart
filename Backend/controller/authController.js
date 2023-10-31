const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");
const sendEmail = require("../utils/email");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  //creating The Document
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  // const token=user.getJwtToken()
  // res.status(201).json({
  //     success:true,
  //     user,
  //     token,
  // })
  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter the Mail && Password", 400));
  }
  // finding User DataBase
  const user = User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Password or Password", 401));
  }
  if (await user.isValidPassword(password)) {
    return next(new ErrorHandler("Invalid Password or Password", 401));
  }
  // const token=user.getJwtToken()
  // res.status(201).json({
  //     success:true,
  //     user,
  //     token,
  // })
  sendToken(user, 201, res);
});

exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      suucess: true,
      message: "Logout",
    });
};

exports.fogotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.find({ email: req.body, email });

  if (!user) {
    return next(new ErrorHandler("User Not Found With this Email", 404));
  }
  const resetToken = user.getResetToken();
  await user.save({ validateBeforeSave: false });
  //create Reset URL
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your ass reset Url is follow ${resetUrl}\n \n If you have Not Requsetd This Then ignore it`;

  try {
    sendEmail({
      email: user.email,
      subject: "kishor password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email send to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message));
  }
});

//reset password -/api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTokenExpire: {
      $gt: Date.now(),
    },
  });

  if (!user) {
    return next(
      new ErrorHandler(`Password reset Token Is Invalid Or Expire`, 404)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler(`Password Does Not Match`, 404));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpire = undefined;
  await User.save({ validateBeforeSave: false });
  sendToken(user, 201, res);
});

//user profile take service

exports.getUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//change password
exports.changePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  //check old password
  if (await user.isValidPassword(req.body.oldPassword)) {
    return next(new ErrorHandler(`Old password Incorrect `, 401));
  }
  // asign new password
  user.password = req.body.password;
  await User.save();
});

//Update-Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// Admin: Get ALL Users

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
});
exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User Not found this id ${req.params.id} `, 401)
    );
  } else {
    success: true, user;
  }
});
//admin Update User

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// Admin : Delete User

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User Not found this id ${req.params.id} `, 401)
    );
  }
  await user.remove();
  res.status(200).json({
    success: true,
  });
});
