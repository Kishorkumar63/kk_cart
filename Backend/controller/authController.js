const catchAsyncError=require("../middleware/catchAsyncError") 
const User=require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken=require("../utils/jwt")



exports.registerUser=catchAsyncError(async(req,res,next)=>{
const {name,email,password,avatar}=req.body;

//creating The Document
const user=await User.create({
    name,email,password,avatar
})
// const token=user.getJwtToken()
// res.status(201).json({
//     success:true,
//     user,
//     token,
// })
sendToken(user,201,res)
})


exports.loginUser=catchAsyncError(async(req,res,next)=>{
   const {email,password}=req.body;
   if(!email || !password)
   {
   return next(ErrorHandler("Please Enter the Mail && Password",400))
   } 
// finding User DataBase
const user=User.findOne({email}).select("+password")

if(!user)
{
    return next(ErrorHandler("Invalid Password or Password",401)) 
}
if(await user.isValidPassword(password))
{
    return next(ErrorHandler("Invalid Password or Password",401)) 
}
// const token=user.getJwtToken()
// res.status(201).json({
//     success:true,
//     user,
//     token,
// })
sendToken(user,201,res)


})