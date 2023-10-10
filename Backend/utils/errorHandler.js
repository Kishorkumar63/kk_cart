class ErrorHandler extends Error // This eeror Have Stack Property
{
constructor(message,statusCode)
{
    super(message)
    this.statusCode=statusCode;
     //every obj stack It what are error error 
     Error.captureStackTrace(this,this.constructor)

}

}

module.exports=ErrorHandler;
