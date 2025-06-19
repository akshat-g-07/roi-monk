import nodemailer from "nodemailer";

const profiles = {
  support: {
    name: "Support | ROI Monk",
    auth: {
      user: process.env.SUPPORT_EMAIL,
      pass: process.env.SUPPORT_PASSWORD,
    },
  },
  feedback: {
    name: "Feedback | ROI Monk",
    auth: {
      user: process.env.FEEDBACK_EMAIL,
      pass: process.env.FEEDBACK_PASSWORD,
    },
  },
  contact: {
    name: "Contact | ROI Monk",
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.CONTACT_PASSWORD,
    },
  },
  akshat: {
    name: "Akshat | ROI Monk",
    auth: {
      user: process.env.AKSHAT_EMAIL,
      pass: process.env.AKSHAT_PASSWORD,
    },
  },
};

export default function GetMailConfig(type) {
  return {
    name: `${profiles[type].auth.user} ${profiles[type].name}`,
    transport: nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: profiles[type].auth,
    }),
  };
}
