"use server";

import { getUserEmail, getUserName } from "@/data/user";
import { db } from "@/lib/db";

export async function UpdateCurrency(currency) {
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
  const userEmail = await getUserEmail();
  try {
    const user = await db.User.findUnique({
      where: {
        email: userEmail,
      },
    });

    const subscribedUpto = new Date(user.subscribedUpto);
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const isDefaultDate =
      subscribedUpto.toISOString() === "2000-01-01T00:00:00.000Z";

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(today.getDate() + 7);
    const isExpiredOrExpiringSoon = subscribedUpto <= sevenDaysFromNow;

    return {
      data: isDefaultDate || isExpiredOrExpiringSoon,
    };
  } catch (error) {
    return { message: "error" };
  }
}

export async function GetSubscriptionDate() {
  const userEmail = await getUserEmail();
  try {
    const user = await db.User.findUnique({
      where: {
        email: userEmail,
      },
    });

    return {
      data: user.subscribedUpto
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, "-"),
    };
  } catch (error) {
    return { message: "error" };
  }
}

export async function UpdateSubscription() {
  const userEmail = await getUserEmail();
  try {
    const user = await db.User.findUnique({
      where: {
        email: userEmail,
      },
    });

    const isDefaultDate =
      user.subscribedUpto.toISOString() === "2000-01-01T00:00:00.000Z";
    let newSubscribedUpto;

    if (isDefaultDate) {
      newSubscribedUpto = new Date();
      newSubscribedUpto.setMonth(newSubscribedUpto.getMonth() + 1);
      newSubscribedUpto.setUTCHours(0, 0, 0, 0);
    } else {
      newSubscribedUpto = new Date(user.subscribedUpto);
      newSubscribedUpto.setMonth(newSubscribedUpto.getMonth() + 1);
    }

    await db.User.update({
      where: { email: userEmail },
      data: { subscribedUpto: newSubscribedUpto },
    });

    return {
      success: true,
      newDate: newSubscribedUpto
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .replace(/ /g, "-"),
    };
  } catch (error) {
    return { message: "error" };
  }
}
