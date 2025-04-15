import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive";
import { SectionCards } from "@/components/dashboard/section-cards";
import { PieChartPage } from "./charts/PieChart";
import { BarChartPage } from "./charts/BarChart";
import { BarChartHorizontal } from "./charts/BarChartHorizontal";

export default function Dashboard() {
  return (
    <div>
      <SectionCards />
      <div className="px-4 lg:px-6 pt-10">
        <ChartAreaInteractive />
        <div className="flex flex-col lg:flex-row justify-between space-x-4 mt-8">
          {/* Mobile: 1 chart per row, Tablet/Laptop: 2 charts per row, Desktop: 3 charts per row */}
          <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
            <PieChartPage />
          </div>
          <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
            <BarChartPage />
          </div>
          <div className="w-full lg:w-1/3">
            <BarChartHorizontal />
          </div>
        </div>
      </div>
    </div>
  );
}
