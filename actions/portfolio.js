"use server";

import { getUserEmail } from "@/data/user";
import { db } from "@/lib/db";

export async function CreatePortfolio(portfolioName, transactions) {
  const userEmail = await getUserEmail();

  try {
    const portfolio = await db.Portfolio.create({
      data: {
        ownerEmail: userEmail,
        portfolioName: portfolioName,
        transactions: {
          create: transactions.map((transaction) => ({
            amount: parseInt(transaction.amount),
            transactionDate: transaction.transactionDate,
            transactionName: transaction.transactionName,
            type: transaction.type === "Credit" ? "CR" : "DR",
            comments: transaction.comments,
          })),
        },
      },
    });

    if (portfolio.id) return { message: portfolio.id };
  } catch (error) {
    console.log(error);

    if (error.code === "P2002") return { message: "unique error" };

    return { message: "error" };
  }
}
