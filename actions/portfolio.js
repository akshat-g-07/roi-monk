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

export async function GetAllPortfolios() {
  const userEmail = await getUserEmail();

  try {
    const portfolios = await db.Portfolio.findMany({
      where: {
        ownerEmail: userEmail,
      },
    });
    if (portfolios) return { data: portfolios };
    else return { message: "empty" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function GetPortfolioByName(portfolioName) {
  const userEmail = await getUserEmail();

  try {
    const portfolio = await db.Portfolio.findFirst({
      where: {
        ownerEmail: userEmail,
        portfolioName: portfolioName,
      },
    });
    if (portfolio) return { data: portfolio };
    else return { message: "unique" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function GetPortfoliosWithinDateRange(dateRange) {
  const userEmail = await getUserEmail();

  try {
    const portfolios = await db.Portfolio.findMany({
      include: { transactions: true },
      where: {
        ownerEmail: userEmail,
        OR: [
          {
            createdDate: {
              gte: new Date(dateRange.from),
              lte: new Date(dateRange.to),
            },
          },
          {
            updatedDate: {
              gte: new Date(dateRange.from),
              lte: new Date(dateRange.to),
            },
          },
        ],
      },
    });

    if (portfolios.length > 0) return { data: portfolios };
    else return { message: "null" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function GetRecentPortfolios(amount = 5) {
  const userEmail = await getUserEmail();

  try {
    const portfolios = await db.Portfolio.findMany({
      where: {
        ownerEmail: userEmail,
      },
      orderBy: {
        updatedDate: "desc",
      },
      take: amount,
    });
    if (portfolios) return { data: portfolios };
    else return { message: "empty" };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function UpdatePortfolioNameById(portfolioId, portfolioNewName) {
  try {
    await db.Portfolio.update({
      where: {
        id: portfolioId,
      },
      data: {
        portfolioName: portfolioNewName,
      },
    });
    return { message: "success" };
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      return { message: "exists" };
    } else {
      return { message: "error" };
    }
  }
}

export async function UpdatePortfolioNameByName(
  portfolioOldName,
  portfolioNewName
) {
  const userEmail = await getUserEmail();

  try {
    await db.Portfolio.update({
      where: {
        ownerEmail_portfolioName: {
          ownerEmail: userEmail,
          portfolioName: portfolioOldName,
        },
      },
      data: {
        portfolioName: portfolioNewName,
      },
    });
    return { message: "success" };
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      return { message: "exists" };
    } else {
      return { message: "error" };
    }
  }
}
