const Product=require("../model/productModel")



//GEPT PRODUCT   /api/v1/
exports.getProducts=async(req,res)=>{
    const products=await Product.find()
    res.json({
        sucess:"success",
        count:products.length,
        products
    })
}
exports.newProduct=async(req,res)=>{
const prdouct=await Product.create(req.body)
res.status(201).json({
    Sucess:["Product Save",true],
    product
})
}


//GET SINGLEPRODUCT  /api/v1/
 exports.getSinglePrdouct=async(req,res,next)=>{

const product= await  Product.findById(req.params.id);

 if(!product)
 {
   return  res.status(404).json({
        success:false,
        message:"product Not Found"
    })
 }
res.status(201).json({
    success:true,
    product
})
 }

 // UPDATE PRODUCT /api/v1/
 exports.updateProduct=async(req,res)=>{
    let product=await Product.findById(req.params.id);
    if(!product)
    {
      return  res.status(404).json({
           success:false,
           message:"product Not Found"
       })
    }

 product= await  Product.findByIdAndUpdate(req.params.id,req.body,{
new:true,
runValidators:true,
    })
    

    res.status(201).json({
        success:true,
        product
    })
 }


 exports.deletePrdouct=async(req,res,next)=>
 {
    let product=await Product.findById(req.params.id);
    if(!product)
    {
      return  res.status(404).json({
           success:false,
           message:"product Not Found"
       })
    }
    await product.remove()
    res.status(201).json({
        success:true,
        message:"Product Deleted"
    })
 }