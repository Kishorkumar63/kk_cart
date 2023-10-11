const sendToken=(user,statusCode,res)=>{

    const token=user.getJwtToken()

//setting Cookies

const options={
    expires:new Date(Date.now()+process.env.JWT_EXPIRES_TIME *24*60*60*1000),
    httpOnly:true,
}
res.status(statusCode).cokkie("token",token,options).json({
        success:true,
        token,
        user,
        
    })


}
module.exports=sendToken