"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { getUserEmail } from "@/data/user";

export async function CreateFeedback(rating, comments) {
  await auth.protect();
  const userEmail = await getUserEmail();

  try {
    const feedback = await db.Feedback.create({
      data: {
        rating,
        comments,
        ownerEmail: userEmail,
      },
    });
    return { data: feedback };
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") return { message: "exists" };
    return { message: "error" };
  }
}
