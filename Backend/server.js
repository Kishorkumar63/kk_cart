const app=require("./app");
const dotenv=require("dotenv");
const path=require("path")
const DBconnect=require("./config/DBConnect")



dotenv.config({path:path.join("config/config.env")})
DBconnect()



app.listen(process.env.PORT,(req,res)=>{
    console.log(`SERVER RUNNING PORT AT : ${process.env.PORT}`);
})