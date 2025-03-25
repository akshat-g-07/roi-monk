import BarChartSummary from "./bar-chart-summary";
import PieChartSummary from "./pie-chart-summary";
import { Card } from "@/components/ui/card";

export default function ChartSummary({ pieChartData, barChartData }) {
  return (
    <>
      <div className="w-full my-2 mb-10 md:mb-0 grid gap-4 lg:grid-cols-2 sm:grid-cols-1 h-fit">
        <Card className="h-full min-h-80">
          <PieChartSummary data={pieChartData} />
        </Card>
        <Card className="h-full min-h-80">
          <BarChartSummary data={barChartData} />
        </Card>
      </div>
    </>
  );
}
