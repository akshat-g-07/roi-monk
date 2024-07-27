import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { TriangleUpIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import { columns } from "@/lib/payment-cols";
import { DataTable } from "@/components/data-table";
import { GetTransactionsByPortfolioName } from "@/actions/transaction";

export default async function Page({ params }) {
  const { portfolioName } = params;
  const transactions = await GetTransactionsByPortfolioName(portfolioName);
  let netRevenue = 0;
  let netROI = 0;
  let annROI = 0;
  console.log("transactions", transactions);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4">
        {/* 
        Total Investment Card
         */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Total Investment
              <MonetizationOnIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            <p>$ Card Content</p>
          </CardContent>
        </Card>
        {/* 
        Revenue Card
         */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Net Revenue
              <PaymentsIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            <p>$ {netRevenue}</p>
            <p>
              {netRevenue >= 0.5 ? (
                <TriangleUpIcon className="text-emerald-500 size-7" />
              ) : (
                <TriangleDownIcon className="text-red-500 size-7" />
              )}
            </p>
          </CardContent>
        </Card>
        {/* 
        Net ROI Card
         */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Net ROI
              <CurrencyExchangeIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            <p>{netROI} %</p>
            <p>
              {netROI >= 0.5 ? (
                <TriangleUpIcon className="text-emerald-500 size-7" />
              ) : (
                <TriangleDownIcon className="text-red-500 size-7" />
              )}
            </p>
          </CardContent>
        </Card>
        {/* 
        Annualized ROI Card
         */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Annualized ROI
              <RequestQuoteIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            <p>{annROI} %</p>
            <p>
              {annROI >= 0.5 ? (
                <TriangleUpIcon className="text-emerald-500 size-7" />
              ) : (
                <TriangleDownIcon className="text-red-500 size-7" />
              )}
            </p>
          </CardContent>
        </Card>
      </div>
      {transactions && transactions.data && (
        <DataTable columns={columns} data={transactions.data} />
      )}
    </>
  );
}
