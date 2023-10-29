const mongoose=require("mongoose");
const dotenv=require("dotenv")
const connectDB=()=>{
    mongoose.connect("mongodb://0.0.0.0:27017/Amazon",{
        // useNewUrlParser:true,
        // useUnfiedTopology:true
    }).then((con)=>{console.log(`Mongo to BE connect TO The Host : ${con.Connection.host}`)})
}
module.exports=connectDB