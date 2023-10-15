// CREATING New Order - api/v1/order/new

const catchAsyncError = require("../middlewares/catchAsync");
const Order=require("../models/orderModel");
const Product=require("../models/productModel")
const ErrorHandler = require("../utils/errorHandler");
exports.newOrder=catchAsyncError(async(req,res,next)=>{
const {orderItems,itemsPrice,taxPrice ,shippingPrice,totalPrice,orderStatus,createdAt,paymentInfo,}=req.body;
const order=await Order.create({
    orderItems,
    itemsPrice,
    taxPrice ,
    shippingPrice,
    totalPrice,
    orderStatus,
    createdAt,
    paymentInfo,
    paidAt:Date.now(),
    user:req.user.id,

})
res.status(200).json({
    success:true,
    order
})


})

//GET SINGLE PRODUCT


exports.getSingleOrder=catchAsyncError(async(req,res,next)=>{
    const order=Order.findById(req.params.id).populate("user","name" ,"email");
    if(!order)
    {
        return next(new ErrorHandler(`Order Not Found with this Id:${req.params.id}`),400);
    }

res.status(200).json({
    success:true,
    order
})


})

// GET loggedIn ORDERS -api/v1/myorders

exports.myOrder=catchAsyncError(async(req,res,next)=>{
    const orders=Order.findById({user:req.user.id})
  
res.status(200).json({
    success:true,
    orders
})


})


//Admin :Get All orders-api/v1/orders

exports.orders=catchAsyncError(async(req,res,next)=>{
    const orders=Order.find();
    let totalAmount=0;
(await orders).forEach(order=>{totalAmount+=order.totalPrice})
res.status(200).json({
    success:true,
    orders
})


})
// Admin :Update Order /Order status

exports.updateOrder=catchAsyncError(async(req,res,next)=>{
    const order=Order.findById({user:req.user.id})
  
if(order.orderStatus=="Delivered")
{
    return next(new ErrorHandler(`Order Hash Been Already Delivered`),400);
}

//updating Product Stock
order.orderItems.forEach(async orderItem=>{
    await updateStock(orderItem.product,orderItem.quantity)
})
order.orderStatus=req.body.orderStatus;
order.deliveredAt=Date.now();await order.save()

res.status(200).json({
    success:true,
   
})


})



async function updateStock(productId,quantity)
{
    const product=await Product.findById(productId);
    product.stock=product.stock-quantity;
    product.save({validateBeforeSave:false})
}

//Admin:Delete Order


exports.deleteOrder=catchAsyncError(async(req,res,next)=>{
    const order=Order.findById({user:req.user.id})
  
    if(!order)
    {
        return next(new ErrorHandler(`Order Not Found with this Id:${req.params.id}`),400);
    }
    await order.remove();

    res.status(200).json({
        success:true,
       
    })
})

