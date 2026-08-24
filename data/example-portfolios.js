import { TotalInvestment, NetRevenue } from "@/data/portfolio-calculations";

// Synthetic, illustrative portfolios used ONLY for public SEO pages (/examples).
// These contain NO real user data. Amounts are intentionally never rendered on
// the public pages — only ROI and percentage weights are shown.
export const EXAMPLE_PORTFOLIOS = [
  {
    slug: "crypto-starter-portfolio",
    name: "Crypto Starter Portfolio",
    category: "Cryptocurrency",
    summary:
      "A beginner-friendly example of tracking a small crypto allocation and its realised returns.",
    description:
      "See how a starter cryptocurrency portfolio is tracked in ROI Monk. This illustrative example follows a few core coins from initial investment through partial exits, showing the net return on investment without exposing any personal financial data.",
    transactions: [
      {
        transactionName: "Bitcoin BTC",
        type: "DR",
        amount: 5000,
        transactionDate: "2023-01-18",
        comments: "Initial BTC allocation",
      },
      {
        transactionName: "Ethereum ETH",
        type: "DR",
        amount: 3000,
        transactionDate: "2023-02-05",
        comments: "Core ETH position",
      },
      {
        transactionName: "Solana SOL",
        type: "DR",
        amount: 1500,
        transactionDate: "2023-03-22",
        comments: "Higher-risk satellite position",
      },
      {
        transactionName: "BTC partial exit",
        type: "CR",
        amount: 7200,
        transactionDate: "2024-03-11",
        comments: "Realised gains on BTC",
      },
      {
        transactionName: "ETH partial exit",
        type: "CR",
        amount: 4100,
        transactionDate: "2024-04-02",
        comments: "Realised gains on ETH",
      },
      {
        transactionName: "SOL partial exit",
        type: "CR",
        amount: 2600,
        transactionDate: "2024-05-19",
        comments: "Realised gains on SOL",
      },
    ],
  },
  {
    slug: "retail-store-business",
    name: "Retail Store Business",
    category: "Retail Business",
    summary:
      "A retail business tracking the capital, fit-out and stock invested against quarterly sales revenue.",
    description:
      "See how a real business transactions is tracked in ROI Monk. This illustrative retail business example follows the initial capital, shop setup and inventory invested through several quarters of sales revenue, showing net ROI without exposing any real financial data.",
    transactions: [
      {
        transactionName: "Initial business capital",
        type: "DR",
        amount: 200000,
        transactionDate: "2023-04-01",
        comments: "Seed capital to start the business",
      },
      {
        transactionName: "Shop deposit and fit-out",
        type: "DR",
        amount: 120000,
        transactionDate: "2023-04-10",
        comments: "Rental deposit and interior setup",
      },
      {
        transactionName: "Opening inventory",
        type: "DR",
        amount: 150000,
        transactionDate: "2023-04-20",
        comments: "First stock purchase",
      },
      {
        transactionName: "Equipment purchase",
        type: "DR",
        amount: 80000,
        transactionDate: "2023-05-05",
        comments: "Billing counter, refrigeration and racks",
      },
      {
        transactionName: "Festive restock",
        type: "DR",
        amount: 90000,
        transactionDate: "2023-08-15",
        comments: "Additional stock for peak season",
      },
      {
        transactionName: "Q1 sales revenue",
        type: "CR",
        amount: 180000,
        transactionDate: "2023-07-31",
        comments: "First quarter of sales",
      },
      {
        transactionName: "Q2 sales revenue",
        type: "CR",
        amount: 260000,
        transactionDate: "2023-10-31",
        comments: "Festive quarter sales",
      },
      {
        transactionName: "Q3 sales revenue",
        type: "CR",
        amount: 240000,
        transactionDate: "2024-01-31",
        comments: "Winter quarter sales",
      },
      {
        transactionName: "Q4 sales revenue",
        type: "CR",
        amount: 300000,
        transactionDate: "2024-04-30",
        comments: "Year-one closing quarter sales",
      },
    ],
  },
  {
    slug: "rental-real-estate-portfolio",
    name: "Rental Real Estate Portfolio",
    category: "Rental Property",
    summary:
      "A directly owned rental property tracked from purchase costs through rental income and current value.",
    description:
      "This example follows a directly owned rental property — not a REIT — in ROI Monk. It tracks the purchase, registration and renovation invested against years of rental income and the property's current marked value, expressed as a clear return on investment.",
    transactions: [
      {
        transactionName: "Property down payment",
        type: "DR",
        amount: 500000,
        transactionDate: "2022-05-01",
        comments: "Initial equity toward purchase",
      },
      {
        transactionName: "Registration and stamp duty",
        type: "DR",
        amount: 90000,
        transactionDate: "2022-05-15",
        comments: "Legal and government charges",
      },
      {
        transactionName: "Renovation and furnishing",
        type: "DR",
        amount: 120000,
        transactionDate: "2022-06-10",
        comments: "Made the unit tenant-ready",
      },
      {
        transactionName: "Year 1 rental income",
        type: "CR",
        amount: 132000,
        transactionDate: "2023-05-31",
        comments: "Twelve months of rent",
      },
      {
        transactionName: "Year 2 rental income",
        type: "CR",
        amount: 144000,
        transactionDate: "2024-05-31",
        comments: "Rent after annual escalation",
      },
      {
        transactionName: "Year 3 rental income",
        type: "CR",
        amount: 156000,
        transactionDate: "2025-05-31",
        comments: "Rent after annual escalation",
      },
      {
        transactionName: "Property marked value",
        type: "CR",
        amount: 720000,
        transactionDate: "2025-06-30",
        comments: "Estimated current market value",
      },
    ],
  },
  {
    slug: "cafe-restaurant-business",
    name: "Café & Restaurant Business",
    category: "Food & Beverage",
    summary:
      "A neighbourhood cafe tracking fit-out, equipment and supplies invested against quarterly sales.",
    description:
      "An illustrative food & beverage business tracked in ROI Monk. This café example follows the interiors, kitchen equipment, licences and ingredients invested through a first year of quarterly sales revenue, shown as a clear net return on investment.",
    transactions: [
      {
        transactionName: "Café interiors and seating",
        type: "DR",
        amount: 350000,
        transactionDate: "2023-06-01",
        comments: "Fit-out and furniture",
      },
      {
        transactionName: "Kitchen equipment",
        type: "DR",
        amount: 180000,
        transactionDate: "2023-06-10",
        comments: "Espresso machine, refrigeration, cookware",
      },
      {
        transactionName: "Licences and security deposit",
        type: "DR",
        amount: 100000,
        transactionDate: "2023-06-15",
        comments: "Food licence and rent deposit",
      },
      {
        transactionName: "Opening inventory",
        type: "DR",
        amount: 60000,
        transactionDate: "2023-06-20",
        comments: "Initial ingredients and supplies",
      },
      {
        transactionName: "Launch marketing",
        type: "DR",
        amount: 40000,
        transactionDate: "2023-07-01",
        comments: "Opening campaign",
      },
      {
        transactionName: "Q1 sales revenue",
        type: "CR",
        amount: 220000,
        transactionDate: "2023-09-30",
        comments: "First quarter of sales",
      },
      {
        transactionName: "Q2 sales revenue",
        type: "CR",
        amount: 300000,
        transactionDate: "2023-12-31",
        comments: "Festive quarter sales",
      },
      {
        transactionName: "Q3 sales revenue",
        type: "CR",
        amount: 280000,
        transactionDate: "2024-03-31",
        comments: "Winter quarter sales",
      },
      {
        transactionName: "Q4 sales revenue",
        type: "CR",
        amount: 340000,
        transactionDate: "2024-06-30",
        comments: "Year-one closing quarter sales",
      },
    ],
  },
  {
    slug: "manufacturing-workshop-portfolio",
    name: "Manufacturing Workshop",
    category: "Manufacturing",
    summary:
      "A manufacturing unit tracking machinery and raw materials against fulfilled order revenue.",
    description:
      "An illustrative manufacturing business tracked in ROI Monk. This workshop example follows the machinery, lease deposit and raw materials invested against successive rounds of fulfilled orders, producing a transparent return on investment.",
    transactions: [
      {
        transactionName: "Machinery and tooling",
        type: "DR",
        amount: 600000,
        transactionDate: "2022-09-01",
        comments: "Core production machines",
      },
      {
        transactionName: "Workshop lease deposit",
        type: "DR",
        amount: 150000,
        transactionDate: "2022-09-10",
        comments: "Industrial unit deposit",
      },
      {
        transactionName: "Raw material batch 1",
        type: "DR",
        amount: 200000,
        transactionDate: "2022-09-20",
        comments: "Initial materials",
      },
      {
        transactionName: "Raw material batch 2",
        type: "DR",
        amount: 180000,
        transactionDate: "2023-01-15",
        comments: "Restock for new orders",
      },
      {
        transactionName: "Orders fulfilled H1",
        type: "CR",
        amount: 420000,
        transactionDate: "2023-03-31",
        comments: "First half order book",
      },
      {
        transactionName: "Orders fulfilled H2",
        type: "CR",
        amount: 560000,
        transactionDate: "2023-09-30",
        comments: "Growing order book",
      },
      {
        transactionName: "Orders fulfilled H3",
        type: "CR",
        amount: 640000,
        transactionDate: "2024-03-31",
        comments: "Repeat and new clients",
      },
    ],
  },
  {
    slug: "freelancing-services-portfolio",
    name: "Freelancing & Services",
    category: "Freelancing",
    summary:
      "A freelancer tracking gear and tools invested against client project revenue.",
    description:
      "An illustrative services business tracked in ROI Monk. This freelancing example follows the equipment, software and upskilling invested against client project and retainer revenue — a low-capital, high-return real-life venture.",
    transactions: [
      {
        transactionName: "Laptop and equipment",
        type: "DR",
        amount: 150000,
        transactionDate: "2023-02-01",
        comments: "Primary work machine and peripherals",
      },
      {
        transactionName: "Software and tools (annual)",
        type: "DR",
        amount: 40000,
        transactionDate: "2023-02-05",
        comments: "Design and development subscriptions",
      },
      {
        transactionName: "Upskilling course",
        type: "DR",
        amount: 30000,
        transactionDate: "2023-03-01",
        comments: "Specialisation certification",
      },
      {
        transactionName: "Coworking membership",
        type: "DR",
        amount: 60000,
        transactionDate: "2023-04-01",
        comments: "Six-month desk",
      },
      {
        transactionName: "Client projects Q1",
        type: "CR",
        amount: 180000,
        transactionDate: "2023-06-30",
        comments: "First project revenue",
      },
      {
        transactionName: "Client projects Q2",
        type: "CR",
        amount: 240000,
        transactionDate: "2023-09-30",
        comments: "Growing client base",
      },
      {
        transactionName: "Client retainer H2",
        type: "CR",
        amount: 360000,
        transactionDate: "2024-01-31",
        comments: "Ongoing retainer revenue",
      },
    ],
  },
];

export function getExamplePortfolioBySlug(slug) {
  return (
    EXAMPLE_PORTFOLIOS.find((portfolio) => portfolio.slug === slug) ?? null
  );
}

// Derives display metrics as PERCENTAGES ONLY. Absolute currency amounts are
// deliberately excluded from the returned shape so pages cannot render them.
export function getExamplePortfolioSummary(portfolio) {
  const totalInvestment = TotalInvestment(portfolio.transactions);
  const netRevenue = NetRevenue(portfolio.transactions);

  const netRoiPercent =
    totalInvestment > 0
      ? ((netRevenue - totalInvestment) / totalInvestment) * 100
      : 0;
  const returnMultiple = totalInvestment > 0 ? netRevenue / totalInvestment : 0;

  const transactions = portfolio.transactions.map((transaction) => {
    const sideTotal = transaction.type === "DR" ? totalInvestment : netRevenue;
    const weightPercent =
      sideTotal > 0 ? (transaction.amount / sideTotal) * 100 : 0;

    return {
      transactionName: transaction.transactionName,
      type: transaction.type,
      transactionDate: transaction.transactionDate,
      comments: transaction.comments ?? "",
      weightPercent,
    };
  });

  return {
    netRoiPercent,
    returnMultiple,
    investmentCount: transactions.filter((t) => t.type === "DR").length,
    revenueCount: transactions.filter((t) => t.type === "CR").length,
    transactions,
  };
}
