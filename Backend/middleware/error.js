module.exports=(err,req,res,next)=>{

    err.status=err.status || 500;

if(process.env.NODE_ENV=="developement")
{
    res.status(err.status).json({
        success:false,
        message:err.message,
        stack:err.stack,
        error:err,
        
            })
        

}
if(process.env.NODE_ENV=="production")
{
    let message=err.message;
    let error=new Error(message)
    if(err.name=="validationError")
    {
         message=Object.values(err.errors).map(value=>value.message)
         error=new Error(message)
    }
    if(err.name=="CastError")
    {
        message=`Resource Not Found:${err.path}`
        error=new Error(message)
    }
    res.status(err.status).json({
        success:false,
        message:  error.message || "Internal Server Error",
        
        
            })
}



   
}