const express=require("express");
const {isAuthenticatedUser,authorizeRoles}=require("../middleware/authenticate")
const { registerUser } = require("../controller/authController");


const { newOrder, getSingleOrder, myOrder, orders, updateOrder, deleteOrder }=require("../controller/orderController")
 const router=express.Router();


 router.route("/order/new").post( isAuthenticatedUser,newOrder)//neworder
 router.route("/order/:id").get( isAuthenticatedUser,getSingleOrder) //getsingelOrder
 router.route("/myorders").get( isAuthenticatedUser,myOrder) //myOrder



 // adminroutes

 router.route("/orders").get( isAuthenticatedUser,authorizeRoles("admin"),orders)//orders
 router.route("/orders/:id").put( isAuthenticatedUser,authorizeRoles("admin"),updateOrder)//updateOrder
 router.route("/delete/:id").put(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)//deleteOrder
 module.exports=router;
