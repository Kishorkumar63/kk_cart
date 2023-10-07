const Product=require("../model/productModel")

exports.getProducts=(req,res)=>{
    res.json({
        sucess:"ssucess"
    })
}
exports.newProduct=async(req,res)=>{
const prdouct=await Product.create(req.body)
res.status(201).json({
    Sucess:["Product Save",true],
    
    product
})
}