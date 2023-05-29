import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { testEmail, testPassword } from "./config";

const sendEmail = async (req: Request, res: Response) => {
  console.log("processing email");
  const name = req.body.name;
  const email = req.body.email;
  const content = req.body.content;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    auth: {
      user: testEmail,
      pass: testPassword,
    },
  });

  const htmlContent = `
  <html>
    <head>
      <title>Message</title>
    </head>
    <body>
      <h1>From: ${name} (${email})</h1>
      <p>${content}</p>
    </body>
  </html>
`;

  const message = {
    from: testEmail,
    to: testEmail,
    subject: `Message from ${name}`,
    text: content,
    html: htmlContent,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send({
        status: "failed",
        message: "unable to send your message",
      });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({
        status: "success",
        message: "Your message has sent to the shelter",
      });
    }
  });
};

export { sendEmail };
