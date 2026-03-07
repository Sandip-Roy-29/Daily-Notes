import nodemailer from "nodemailer";

export const sendMail = async({name, email, type, subject, message}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      }
    });
  
    const result = await transporter.sendMail({
      from: `"Daily Notes Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `[${type.toUpperCase()}] ${subject}`,
      replyTo: email,
      text:`
      Message Type: ${type}
      From: ${name}
      User Email: ${email}
      Message: ${message}
      `
    })

    return result;
    
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
}