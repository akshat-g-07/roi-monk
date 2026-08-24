"use client";

import { useState, useMemo } from "react";
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
import CreateFirstPortfolio from "@/components/dashboard/create-first-portfolio";
import ChartSummary from "@/components/dashboard/chart-summary";
import SummaryCards from "@/components/common/summary-cards";
import { GetPortfoliosWithinDateRange } from "@/actions/portfolio";
import { NetRevenue, TotalInvestment } from "@/data/portfolio-calculations";
import { useServerAction } from "@/hooks/useServerAction";
import Loading from "@/components/common/loading";
import Error from "@/components/common/error";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Page() {
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  // Calendar selection is only committed to the query when "Apply" is clicked.
  const [appliedDate, setAppliedDate] = useState(date);
  const [open, setOpen] = useState(false);
  const [rangeError, setRangeError] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const {
    isLoading,
    data: portfolios,
    error,
  } = useServerAction(GetPortfoliosWithinDateRange, appliedDate);

  const handleSelect = (range) => {
    setDate(range);
    if (range?.from && range?.to) setRangeError(false);
  };

  const handleOpenChange = (next) => {
    setOpen(next);
    // Reset error on open; discard an uncommitted selection on close.
    if (next) setRangeError(false);
    else setDate(appliedDate);
  };

  const handleApply = () => {
    if (!date?.from || !date?.to) {
      setRangeError(true);
      return;
    }
    setAppliedDate(date);
    setOpen(false);
  };

  const { totalInvestment, netRevenue, netROI, pieChartData, barChartData } =
    useMemo(() => {
      if (!portfolios || portfolios.length === 0) {
        return {
          totalInvestment: 0,
          netRevenue: 0,
          netROI: 0,
          pieChartData: [],
          barChartData: [],
        };
      }
      let totalInv = 0;
      let netRev = 0;

      const pieData = [];
      const barData = [];

      portfolios.forEach((portfolio) => {
        const tempTotalInv = TotalInvestment(portfolio.transactions);
        const tempNetRev = NetRevenue(portfolio.transactions);

        totalInv += tempTotalInv;
        netRev += tempNetRev;

        pieData.push({
          name: portfolio.portfolioName,
          value: tempTotalInv,
        });

        barData.push({
          name: portfolio.portfolioName,
          Investment: tempTotalInv,
          Revenue: tempNetRev,
        });
      });

      let roi = ((netRev - totalInv) / totalInv) * 100 || 0;

      return {
        totalInvestment: totalInv,
        netRevenue: netRev,
        netROI: roi === 0 ? 0 : parseFloat(roi).toFixed(2),
        pieChartData: pieData,
        barChartData: barData,
      };
    }, [portfolios]);

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  if (portfolios.length === 0) return <CreateFirstPortfolio />;

  return (
    <>
      <div className="w-full flex flex-wrap justify-between text-lg font-bold items-center mb-4">
        Summary
        <div className={cn("grid gap-2")}>
          <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-normal my-2 md:my-0",
                  !date && "text-muted-foreground",
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
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                resetOnSelect
                defaultMonth={date?.from}
                selected={date}
                onSelect={handleSelect}
                numberOfMonths={isMobile ? 1 : 2}
                className="bg-background text-foreground"
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
              <div className="flex flex-col items-center justify-center gap-3 border-t p-3">
                {rangeError && (
                  <p className="text-sm font-medium text-red-500">
                    Select two dates Please!
                  </p>
                )}
                <Button className="cursor-pointer" onClick={handleApply}>
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <SummaryCards
        totalInvestment={totalInvestment}
        netRevenue={netRevenue}
        netROI={netROI}
      />

      <ChartSummary pieChartData={pieChartData} barChartData={barChartData} />
    </>
  );
}
