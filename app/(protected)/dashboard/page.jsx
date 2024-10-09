"use client";

import * as React from "react";
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

export default function Page() {
  const [date, setDate] = React.useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  // Some server action to calculate these values
  let netRevenue = 0;
  let netROI = 0;
  let totalInvestment = 0;
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
              {netROI >= 0.5 ? (
                <TriangleUpIcon className="text-emerald-500 size-7" />
              ) : (
                <TriangleDownIcon className="text-red-500 size-7" />
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 
      Tabs between graphical summary and tabular summary
       */}

      <div className="w-full my-2 grid gap-4 lg:grid-cols-2 sm:grid-cols-1 h-96">
        <Card className="h-full min-h-80">
          <PieChartSummary />
        </Card>
        <Card className="h-full min-h-80">
          <BarChartSummary />
        </Card>
      </div>
    </>
  );
}
