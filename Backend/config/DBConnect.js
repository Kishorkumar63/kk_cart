const mongoose=require("mongoose");
const dotenv=require("dotenv")
const connectDB=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/Amazon",{
        // useNewUrlParser:true,
        // useUnfiedTopology:true
    }).then((con)=>{console.log(`Mongo to BE connect TO The Host : ${con.Connection.host}`)}).catch((err)=>{console.log(err);})
}
module.exports=connectDB