"use server";

import { auth } from "@clerk/nextjs/server";
import { getUserEmail } from "@/data/user";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function CreatePortfolio(portfolioName, transactions) {
  await auth.protect();
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

    revalidatePath("/", "layout");
    if (portfolio.id) return { message: portfolio.id };
  } catch (error) {
    console.log(error);

    if (error.code === "P2002") return { message: "unique error" };

    return { message: "error" };
  }
}

export async function GetAllPortfolios() {
  await auth.protect();
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
  await auth.protect();
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
  await auth.protect();
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

    return { data: portfolios };
  } catch (error) {
    console.log(error);
    return { message: "error" };
  }
}

export async function GetRecentPortfolios(amount = 5) {
  await auth.protect();
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
  await auth.protect();
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
  portfolioNewName,
) {
  await auth.protect();
  const userEmail = await getUserEmail();

  try {
    // The encrypted portfolioName can't resolve inside the compound unique key,
    // so find the owner-scoped record first, then update it by id.
    const portfolio = await db.Portfolio.findFirst({
      where: {
        ownerEmail: userEmail,
        portfolioName: portfolioOldName,
      },
    });

    if (!portfolio) return { message: "error" };

    await db.Portfolio.update({
      where: {
        id: portfolio.id,
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
