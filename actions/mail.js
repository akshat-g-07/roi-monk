"use server";

import { auth } from "@clerk/nextjs/server";
import { getUserEmail } from "@/data/user";
import GetMailConfig from "@/lib/mail-config";

const BCC_EMAIL = process.env.BCC_EMAIL;
const mailContent = {
  welcome: {
    subject: "Welcome to ROI Monk",
    text: `Hi, I am Akshat Garg <a href="https://akshat-garg.com">https://akshat-garg.com</a>, creator of ROI Monk.\nThank you for joining ROI Monk. I am excited to have you on board.`,
  },
  support: (supportId) => ({
    subject: "Support- ROI Monk",
    text: `Hi, You support ticket has been created with id: ${supportId}.\nYou will get to hear from me very soon regarding this.`,
  }),
  feedback: {
    subject: "Feedback- ROI Monk",
    text: `Hi, Thanks for your feedback!.\nIt inspires me to work harder.`,
  },
};

export async function SendWelcomeMail() {
  await auth.protect();
  const mail = mailContent["welcome"];
  const email = await getUserEmail();
  const { name, transport } = GetMailConfig("akshat");
  const mailOptions = {
    from: name,
    to: email,
    bcc: BCC_EMAIL,
    subject: mail.subject,
    text: mail.text,
  };

  try {
    await transport.sendMail(mailOptions);

    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function SendSupportMail(supportId) {
  await auth.protect();
  const mail = mailContent["support"](supportId);
  const email = await getUserEmail();
  const { name, transport } = GetMailConfig("support");

  const mailOptions = {
    from: name,
    to: email,
    bcc: BCC_EMAIL,
    subject: mail.subject,
    text: mail.text,
  };

  try {
    await transport.sendMail(mailOptions);
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function SendFeedbackMail() {
  await auth.protect();
  const mail = mailContent["feedback"];
  const email = await getUserEmail();
  const { name, transport } = GetMailConfig("feedback");

  const mailOptions = {
    from: name,
    to: email,
    bcc: BCC_EMAIL,
    subject: mail.subject,
    text: mail.text,
  };

  try {
    await transport.sendMail(mailOptions);
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}
