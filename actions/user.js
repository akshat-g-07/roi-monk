"use server";

import { auth } from "@clerk/nextjs/server";
import { getUserEmail, getUserName } from "@/data/user";
import { db } from "@/lib/db";

export async function UpdateCurrency(currency) {
  await auth.protect();
  const userEmail = await getUserEmail();

  try {
    await db.User.update({
      where: {
        email: userEmail,
      },
      data: {
        currency,
      },
    });
    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function GetUser() {
  await auth.protect();
  const userEmail = await getUserEmail();

  try {
    const user = await db.User.findFirst({
      where: {
        email: userEmail,
      },
    });
    return { data: user };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function UserRegistration() {
  await auth.protect();
  const userName = await getUserName();
  const userEmail = await getUserEmail();

  try {
    const user = await db.User.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (user) return { message: "User Exists" };
    else {
      await db.User.create({
        data: {
          email: userEmail,
          name: userName,
        },
      });
      return { message: "User Created" };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GetPaymentStatus() {
  await auth.protect();
  const userEmail = await getUserEmail();
  try {
    const user = await db.User.findUnique({
      where: {
        email: userEmail,
      },
    });

    return {
      data: user.subscribed,
    };
  } catch (error) {
    return { message: "error" };
  }
}