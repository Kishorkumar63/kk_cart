const express=require("express");
const {registerUse}=require("../controller/authController")
const router=express.Router();



router.route("/register").post(registerUse)

















module.exports= router;