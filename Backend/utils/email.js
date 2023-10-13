const nodemailer=require("nodemailer")

const sendMial=async options=>{
    const transport={
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS,
        }
    };
    //creating Transport For Sending to Mailtrap
  const transporter= nodemailer.createTransport(transport);
  // sending Message To the Email
  const message={
    from:`${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to:options.email,
    subject:options.subject,
    text:options.message,
  }
 await transporter.sendMail(message)


}
module.exports=sendMial