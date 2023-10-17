const mongoose = require("mongoose");
const validator = require("validator");
//const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter The Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Mail"],
    unique: true,
    validate: [validator.isEmail, "Please Enter Valid Email"],
  },
  password: {
    type: String,
    required: [true, "please Enter the Password"],
    maxLength: [6, "password cannot Exceed 6 character"],
    select: false,
  },
  avatar: {
    type: String,
    default: "user",
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // schema property
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.getJwtToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_TIME }
  );
};

userSchema.methods.isValidPassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};
userSchema.methods.getResetToken = function () {
  //Gentrate Token
  const token = crypto.randomBytes(20).toString("hex");
  // Genrate Hash And set resetPassword
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordTokenExpire = Date.now() * 30 * 60 * 100;
  return token;
};
const model = mongoose.model("User", userSchema);
module.exports = model;
