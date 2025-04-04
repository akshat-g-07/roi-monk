"use server";

import { db } from "@/lib/db";
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

function generateMailOptions(refVal, freq) {
  const refArray = refVal.split("aa").map((item) => {
    return Buffer.from(item, "base64").toString();
  });

  return {
    from: `${process.env.EMAIL} Akshat`,
    to: "akshatg805@gmail.com",
    subject: "ROI Monk Visited",
    text: `Rec- ${refArray[0]}\nRole- ${refArray[1]}\nShared On- ${
      refArray[2]
    }\nVisited On- ${
      new Date()
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, "-") +
      " " +
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    }\n${freq}th time`,
  };
}

export async function CreateRef(refVal) {
  try {
    await db.Ref.create({
      data: {
        id: refVal,
      },
    });
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function GetRef(refVal) {
  if (!refVal) return { message: "refVal is absent" };

  try {
    const ref = await db.Ref.findUnique({
      where: {
        id: refVal,
      },
    });
    return { data: ref };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function UpdateRef(refVal) {
  if (!refVal) return { message: "refVal is absent" };

  try {
    const ref = await db.Ref.findUnique({
      where: {
        id: refVal,
      },
    });

    if (ref) {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      const hasRecentVisit =
        ref?.visited &&
        ref.visited.length > 0 &&
        new Date(ref.visited[ref.visited.length - 1]) > fifteenMinutesAgo;

      if (!hasRecentVisit) {
        await db.Ref.update({
          where: {
            id: refVal,
          },
          data: {
            visited: {
              push: new Date(),
            },
          },
        });
        await transporter.sendMail(
          generateMailOptions(refVal, ref.visited.length + 1)
        );

        return { message: "success" };
      }

      return { message: "recently updated" };
    }
    return { message: "record not found" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}
