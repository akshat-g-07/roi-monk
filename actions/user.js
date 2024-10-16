"use server";

import { getUserEmail } from "@/data/user";
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
