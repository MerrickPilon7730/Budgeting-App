
import { DataGrid } from "@/components/data-table/data-grid";
import { DataCharts } from "@/components/data-table/data-charts";


export default function DashboardPage() {


  return (
    <div className="max-w-screen mx-auto w-full pb-10 -mt-24">
      <DataGrid />
      <DataCharts />
    </div>

  );
}
