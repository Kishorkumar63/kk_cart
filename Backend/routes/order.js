const express=require("express");
const { isAuthentictedUser, authorizeRoles } = require("../middlewares/authenticated");
const { registerUser } = require("../controllers/authController");


const { newOrder, getSingleOrder, myOrder, orders, updateOrder, deleteOrder }=require("../controllers/orderController")
 const router=express.Router();


 router.route("/order/new").post(isAuthentictedUser,newOrder)//neworder
 router.route("/order/:id").get(isAuthentictedUser,getSingleOrder) //getsingelOrder
 router.route("/myorders").get(isAuthentictedUser,myOrder) //myOrder



 // adminroutes

 router.route("/orders").get(isAuthentictedUser,authorizeRoles("admin"),orders)//orders
 router.route("/orders/:id").put(isAuthentictedUser,authorizeRoles("admin"),updateOrder)//updateOrder
 router.route("/delete/:id").put(isAuthentictedUser,authorizeRoles("admin"),deleteOrder)//deleteOrder
 module.exports=router;
