"use server";

import { getUserEmail } from "@/data/user";
import { db } from "@/lib/db";
import { GetPortfolioByName } from "./portfolio";

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

export async function DeleteTransaction(transactionIds) {
  try {
    await db.Transaction.deleteMany({
      where: {
        id: { in: transactionIds },
      },
    });

    return { message: "success" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function UpdateTransactions(portfolioName, transactions) {
  try {
    const portfolio = await GetPortfolioByName(portfolioName);

    if (portfolio.message === "unique") throw new Error("Portfolio Not Found");

    const upsertTransactions = transactions.map((transaction) =>
      db.Transaction.upsert({
        where: {
          id: transaction.id,
        },
        update: {
          transactionName: transaction.transactionName,
          type: transaction.type,
          amount: parseInt(transaction.amount),
          transactionDate: transaction.transactionDate,
          comments: transaction.comments,
        },
        create: {
          transactionName: transaction.transactionName,
          type: transaction.type,
          amount: parseInt(transaction.amount),
          transactionDate: transaction.transactionDate,
          comments: transaction.comments,
          portfolio: {
            connect: {
              id: portfolio.data.id,
            },
          },
        },
      })
    );

    await Promise.all(upsertTransactions);

    return { message: "success" };
  } catch (error) {
    console.log(error);
    if (error.message === "Portfolio Not Found")
      return { message: error.message };
    return { message: "error" };
  }
}
