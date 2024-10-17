"use server";

import { db } from "@/lib/db";
import { getUserEmail } from "@/data/user";

export async function CreateSupportTicket(reason, concern) {
  const userEmail = await getUserEmail();

  try {
    const ticket = await db.Support.create({
      data: {
        reason,
        concern,
        ownerEmail: userEmail,
      },
    });
    return { data: ticket };
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") return { message: "exists" };
    return { message: "error" };
  }
}
