const catchAsyncError=require("../middleware/catchAsyncError") 
const User=require("../model/userModel")



const registerUser=catchAsyncError(async(req,res,next)=>{
const {name,email,password,avatar}=req.body;

//creating The Document
const user=await User.create({
    name,email,password,avatar
})
res.status(201).json({
    success:true,
    user
})




})