const app=require("./app");
const dotenv=require("dotenv");
const path=require("path")
const DBconnect=require("./config/DBConnect")



dotenv.config({path:path.join("config/config.env")})
DBconnect()



app.listen(process.env.PORT,(req,res)=>{
    console.log(`SERVER RUNNING PORT AT : ${process.env.PORT} ENVIRONMENT ${process.env.NODE_ENV}`);
})



// MOngo DB Connection ERROE


// process.on("unhandledRejection",(err)=>{
//         console.log(`Error ${err.messsage}`);
//         console.log(`shutting Down Server Due To Uhandled`);
//     server.close(()=>{
//         process.exit(1)
//     })
    
//     })

//    process.on("uncaughtException",(err)=>{
//     console.log(`Error ${err.messsage}`);
//     console.log(`shutting Down Server Due To Uncaught Exception`);
// server.close(()=>{
//     process.exit(1)
// })

// })
