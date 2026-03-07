import { expect, jest } from "@jest/globals";

jest.unstable_mockModule("nodemailer", () => ({
    default:{
        createTransport: jest.fn()
    }
}))

const nodemailer = (await import("nodemailer")).default;
const {sendMail} = await import("../../../src/utils/sendMail.js");

it("should send email with correct configuration", async () => {
    const sendMailMock = jest.fn().mockResolvedValue({ messageId: "12345"});

    nodemailer.createTransport.mockReturnValue({
        sendMail: sendMailMock,
    });

    process.env.EMAIL_USER = "test@gmail.com";
    process.env.EMAIL_PASS = "password";

    await sendMail({
        name: "Sandip",
        email: "user@gmail.com",
        type: "support",
        subject: "Need help",
        message: "Hello there"
    });

    expect (nodemailer.createTransport).toHaveBeenCalledWith({
        service: "gmail",
        auth:{
            user: "test@gmail.com",
            pass: "password",
        }
    });
    
    expect(sendMailMock).toHaveBeenCalledWith({
    from: `"Daily Notes Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "[SUPPORT] Need help",
    replyTo: "user@gmail.com",
    text: expect.stringContaining("Sandip"),
  });
});

it("should throw error if sending fails", async () => {
    const sendMailMock = jest.fn().mockRejectedValue(new Error("SMTP failed"));

    nodemailer.createTransport.mockReturnValue({
        sendMail: sendMailMock
    });

    await expect(
        sendMail({
            name: "Sandip",
            email: "user@gmail.com",
            type: "support",
            subject: "Need help",
            message: "Hello" 
        })
    ).rejects.toThrow("SMTP failed");
})