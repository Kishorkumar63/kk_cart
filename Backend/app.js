const express=require("express");
const app=express();
const errorMiddleware=require("./middleware/error")
const products=require("./routes/products")
const auth=require("./routes/auth")
const order=require("./routes/order")
const cookeiPareser=require("cookie-parser")
app.use(express.json())
app.use(cookeiPareser())


app.use("/api/v1",products)
app.use("/api/v1",auth)
app.use("/api/v1",order)




app.use(errorMiddleware)
module.exports =app;