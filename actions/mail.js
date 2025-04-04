"use server";

import { getUserEmail } from "@/data/user";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function SendWelcomeMail() {
  const mail = mailType["welcome"]("arg");
  const email = await getUserEmail();
  const mailOptions = {
    from: `${process.env.EMAIL} Akshat`,
    to: email,
    bcc: "akshatg805@gmail.com",
    subject: mail.subject,
    text: mail.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function SendSupportMail(supportId) {
  const mail = mailType["support"](supportId);
  const email = await getUserEmail();
  const mailOptions = {
    from: `${process.env.EMAIL} Akshat`,
    to: email,
    bcc: "akshatg805@gmail.com",
    subject: mail.subject,
    text: mail.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

const mailType = {
  welcome: (arg) => ({
    subject: "Welcome to ROI Monk",
    text: `Hi, I am Akshat Garg (https://akshat-garg.com), creator of ROI Monk.\nThank you for joining ROI Monk. I am excited to have you on board.`,
  }),
  support: (supportId) => ({
    subject: "Support- ROI Monk",
    text: `Hi, You support ticket has been created with id: ${supportId}.\nYou will get to hear from me very soon regarding this.`,
  }),
};
