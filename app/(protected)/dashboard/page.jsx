import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { TriangleUpIcon, TriangleDownIcon } from "@radix-ui/react-icons";

export default function Page() {
  // Some server action to calculate these values
  let netRevenue = Math.random();
  let netROI = Math.random();
  let annROI = Math.random();
  return (
    <>
      <div className="p-8 bg-red-500">
        <div className="w-full bg-yellow-500 flex justify-between text-base font-normal items-center">
          Summary
        </div>

        {/* 
        Summary Cards 
        */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </>
  );
}
