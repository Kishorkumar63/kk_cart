const express=require("express");
const app=express();
const errorMiddleware=require("./middleware/error")
const products=require("./routes/products")
const auth=require("./routes/auth")

app.use(express.json())



app.use("/api/v1",products)
app.use("/api/v1",auth)





app.use(errorMiddleware)
module.exports =app;