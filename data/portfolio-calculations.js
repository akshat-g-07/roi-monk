export function TotalInvestment(transactions) {
  let totalInvestment = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "DR") totalInvestment += transaction.amount;
  });

  return totalInvestment;
}

export function NetRevenue(transactions) {
  let netRevenue = 0;

  transactions.forEach((transaction) => {
    if (transaction.type === "CR") netRevenue += transaction.amount;
  });

  return netRevenue;
}

export function NetROI(transactions) {
  let netRevenue = NetRevenue(transactions);
  let totalInvestment = TotalInvestment(transactions);
  let netROI = ((netRevenue - totalInvestment) / totalInvestment) * 100 || 0;

  return netROI;
}
