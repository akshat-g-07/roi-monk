import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { TriangleUpIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import Loading from "./loading";
import { useUserCurrency } from "@/contexts/user-currency";

export default function SummaryCards({
  totalInvestment,
  netRevenue,
  netROI,
  isLoading,
}) {
  const userCurrency = useUserCurrency().split("- ")[1];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3">
        {/* 
  Total Investment Card
   */}
        <Card className="min-h-36 relative">
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Total Investment
              <MonetizationOnIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            {isLoading ? (
              <Loading className="bg-transparent w-fit" size="2rem" />
            ) : (
              <p>
                {userCurrency} {totalInvestment}
              </p>
            )}
          </CardContent>
        </Card>

        {/* 
  Revenue Card
   */}
        <Card className="min-h-36">
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Net Revenue
              <PaymentsIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            {isLoading ? (
              <Loading className="bg-transparent w-fit" size="2rem" />
            ) : (
              <p>
                {userCurrency} {netRevenue}
              </p>
            )}
          </CardContent>
        </Card>

        {/* 
  Net ROI Card
   */}
        <Card className="min-h-36">
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Net ROI
              <CurrencyExchangeIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            {isLoading ? (
              <Loading className="bg-transparent w-fit" size="2rem" />
            ) : (
              <>
                <p>{netROI} %</p>
                <p>
                  {netROI > 0 ? (
                    <TriangleUpIcon className="text-emerald-500 size-7" />
                  ) : (
                    netROI < 0 && (
                      <TriangleDownIcon className="text-red-500 size-7" />
                    )
                  )}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
