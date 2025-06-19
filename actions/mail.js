"use server";

import { cookies } from "next/headers";
import { getUserEmail } from "@/data/user";
import GetMailConfig from "@/lib/mail-config";

const BCC_EMAIL = process.env.BCC_EMAIL;
const mailContent = {
  welcome: (refVal) => ({
    subject: "Welcome to ROI Monk",
    text: `Hi, I am Akshat Garg (https://akshat-garg.com${refVal}), creator of ROI Monk.\nThank you for joining ROI Monk. I am excited to have you on board.`,
  }),
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
  const cookieStore = cookies();
  const refVal = cookieStore.get("ref").value === "rec" ? "/?ref=rec" : "";
  const mail = mailContent["welcome"](refVal);
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
