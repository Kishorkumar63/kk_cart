const Product=require("../model/productModel")
const products=require("../data/products.json")
const dotenv=require("dotenv")
const DBconnect=require("../config/DBConnect")
dotenv.config({path:"Backend/config/config.env"})
DBconnect()


const seederPrdoucts=async()=>{
    try{
   await Product.deleteMany()
   console.log("Product Deleted");
  await  Product.insertMany(products)
  console.log("ALL PRODUCTS ADDED");
    }
    catch(error)
    {
        console.log(error.message);
    }
    process.exit()
}
seederPrdoucts()