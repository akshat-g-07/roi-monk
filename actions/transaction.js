"use server";

import { getUserEmail } from "@/data/user";
import { db } from "@/lib/db";

export async function GetTransactionsByPortfolioName(portfolioName) {
  const userEmail = await getUserEmail();

  try {
    const transactions = await db.Transaction.findMany({
      where: {
        portfolio: {
          ownerEmail: userEmail,
          portfolioName: portfolioName,
        },
      },
    });

    if (transactions) return { data: transactions };
    else return { message: "no data" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}
