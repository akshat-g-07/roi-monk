"use client";

import { useState, useEffect, useMemo } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { TriangleUpIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import PieChartSummary from "@/components/dashboard/pie-chart-summary";
import BarChartSummary from "@/components/dashboard/bar-chart-summary";
import { GetPortfoliosWithinDateRange } from "@/actions/portfolio";
import { NetRevenue, TotalInvestment } from "@/data/portfolio-calculations";

export default function Page() {
  const [portfolios, setPortfolios] = useState([]);
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  useEffect(() => {
    async function getPortfolios() {
      const portfoliosResponse = await GetPortfoliosWithinDateRange(date);
      if (portfoliosResponse.data) setPortfolios(portfoliosResponse.data);
    }

    getPortfolios();
  }, [date]);

  const { totalInvestment, netRevenue, netROI } = useMemo(() => {
    let totalInv = 0;
    let netRev = 0;

    if (portfolios.length > 0)
      portfolios.forEach((portfolio) => {
        totalInv += TotalInvestment(portfolio.transactions);
        netRev += NetRevenue(portfolio.transactions);
      });

    let roi = ((netRev - totalInv) / totalInv) * 100 || 0;

    return {
      totalInvestment: totalInv,
      netRevenue: netRev,
      netROI: roi === 0 ? 0 : parseFloat(roi).toFixed(2),
    };
  }, [portfolios]);

  const pieChartData = useMemo(() => {
    if (!portfolios || portfolios.length === 0) return [];

    return portfolios.map((portfolio) => ({
      name: portfolio.portfolioName,
      value: TotalInvestment(portfolio.transactions),
    }));
  }, [portfolios]);

  return (
    <>
      <div className="w-full flex flex-wrap justify-between text-lg font-bold items-center mb-4">
        Summary
        <div className={cn("grid gap-2")}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-background text-foreground"
              align="end"
            >
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className="bg-background dark text-foreground"
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* 
        Summary Cards 
        */}
      <div className="grid gap-4 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3">
        {/* 
        Total Investment Card
         */}
        <Card className="min-h-36">
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Total Investment
              <MonetizationOnIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            <p>$ {totalInvestment}</p>
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
            <p>$ {netRevenue}</p>
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
          </CardContent>
        </Card>
      </div>

      <div className="w-full my-2 grid gap-4 lg:grid-cols-2 sm:grid-cols-1 h-96">
        <Card className="h-full min-h-80">
          <PieChartSummary data={pieChartData} />
        </Card>
        <Card className="h-full min-h-80">
          <BarChartSummary />
        </Card>
      </div>
    </>
  );
}
