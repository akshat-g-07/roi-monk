// Seeds demo data for a single user: 5 portfolios, each with 7+ transactions.
// Reuses the app's db client so field-encryption + portfolioNameHash are applied.
//
// Run:  npm run db:seed
// User resolution order:
//   1. --email=you@example.com  (optionally SEED_USER_NAME="Your Name" to create it)
//   2. SEED_USER_EMAIL env var
//   3. the only user in the DB (auto-detected)
import "dotenv/config";
import { db } from "../lib/db.js";

// DR = investment (money in), CR = returns (money out) — see data/portfolio-calculations.js.
// Names/comments use only characters the app's transaction form allows.
const PORTFOLIO_BLUEPRINTS = [
  {
    name: "Tech Growth",
    buys: [
      "Buy AAPL",
      "Buy MSFT",
      "Buy NVDA",
      "Buy GOOGL",
      "Buy AMZN",
      "Buy META",
    ],
    returns: ["Sell NVDA Gains", "AAPL Dividend", "MSFT Dividend", "Trim META"],
  },
  {
    name: "Dividend Income",
    buys: ["Buy KO", "Buy PG", "Buy JNJ", "Buy PEP", "Buy VZ", "Buy ABBV"],
    returns: ["KO Dividend", "PG Dividend", "JNJ Dividend", "VZ Dividend"],
  },
  {
    name: "Crypto Basket",
    buys: ["Buy BTC", "Buy ETH", "Buy SOL", "Buy ADA", "Buy DOT", "Buy LINK"],
    returns: ["Sell BTC Partial", "ETH Staking Rewards", "Sell SOL Gains"],
  },
  {
    name: "Real Estate REITs",
    buys: ["Buy VNQ", "Buy O", "Buy SPG", "Buy PLD", "Buy AMT", "Buy STAG"],
    returns: [
      "O Dividend",
      "SPG Dividend",
      "VNQ Distribution",
      "STAG Dividend",
    ],
  },
  {
    name: "Index Retirement",
    buys: ["Buy VOO", "Buy VTI", "Buy QQQ", "Buy SCHD", "Buy BND", "Buy VXUS"],
    returns: [
      "VOO Dividend",
      "SCHD Dividend",
      "Rebalance Sell",
      "QQQ Dividend",
    ],
  },
];

const BUY_COMMENTS = [
  "Monthly SIP.",
  "DCA buy.",
  "Long-term hold.",
  "Averaging down.",
  "Core position.",
];
const RETURN_COMMENTS = [
  "Booked partial profits!",
  "Dividend received.",
  "Rebalanced allocation.",
  "Trimmed position.",
  "Reinvested payout.",
];

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[randInt(0, arr.length - 1)];
const maybe = (pool) => (Math.random() < 0.6 ? pick(pool) : null);

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(12, 0, 0, 0);
  return d;
}

function buildTransactions(bp) {
  const txCount = randInt(7, 10);
  const crCount = Math.min(randInt(2, 3), txCount - 4);
  const drCount = txCount - crCount;

  // Investments happen before returns, so give DRs the older dates.
  const dates = Array.from({ length: txCount }, () => randInt(20, 700))
    .sort((a, b) => b - a)
    .map(daysAgo);

  const transactions = [];
  for (let i = 0; i < drCount; i++) {
    transactions.push({
      transactionName: pick(bp.buys),
      type: "DR",
      amount: randInt(15, 400) * 100,
      transactionDate: dates[i],
      comments: maybe(BUY_COMMENTS),
    });
  }
  for (let i = 0; i < crCount; i++) {
    transactions.push({
      transactionName: pick(bp.returns),
      type: "CR",
      amount: randInt(3, 180) * 100,
      transactionDate: dates[drCount + i],
      comments: maybe(RETURN_COMMENTS),
    });
  }
  return transactions;
}

async function resolveTargetUser() {
  const argEmail = process.argv
    .slice(2)
    .find((a) => a.startsWith("--email="))
    ?.split("=")[1]
    ?.trim();
  const email = argEmail || process.env.SEED_USER_EMAIL?.trim();

  if (email) {
    const existing = await db.User.findUnique({ where: { email } });
    if (existing) return existing;
    const name = (process.env.SEED_USER_NAME || email.split("@")[0]).trim();
    return db.User.create({ data: { email, name } });
  }

  const users = await db.User.findMany({ orderBy: { email: "asc" } });
  if (users.length === 1) return users[0];
  if (users.length === 0) {
    throw new Error(
      'No users found. Sign in once to create your account, or pass --email=you@example.com (optionally SEED_USER_NAME="Your Name").',
    );
  }
  throw new Error(
    "Multiple users found. Choose one with --email=...\n" +
      users.map((u) => `  - ${u.email}`).join("\n"),
  );
}

async function main() {
  const user = await resolveTargetUser();
  // portfolioName is globally unique; a per-run token keeps re-runs collision-free.
  const runToken = Math.random().toString(36).slice(2, 6);

  console.log(
    `Seeding ${PORTFOLIO_BLUEPRINTS.length} portfolios for ${user.email} (run ${runToken})\n`,
  );

  let totalTx = 0;
  for (const bp of PORTFOLIO_BLUEPRINTS) {
    const transactions = buildTransactions(bp);
    const portfolioName = `${bp.name} ${runToken}`;

    await db.Portfolio.create({
      data: {
        ownerEmail: user.email,
        portfolioName,
        transactions: { create: transactions },
      },
    });

    const invested = transactions
      .filter((t) => t.type === "DR")
      .reduce((s, t) => s + t.amount, 0);
    const returns = transactions
      .filter((t) => t.type === "CR")
      .reduce((s, t) => s + t.amount, 0);
    totalTx += transactions.length;

    console.log(
      `  created: ${portfolioName}  (${transactions.length} tx, invested ${invested}, returns ${returns})`,
    );
  }

  console.log(
    `\nDone. ${PORTFOLIO_BLUEPRINTS.length} portfolios and ${totalTx} transactions created.`,
  );
}

main()
  .catch((error) => {
    console.error("\nSeed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
