
import { Suspense } from "react";
import { DataGrid } from "@/components/data-table/data-grid";
import { DataCharts } from "@/components/charts/data-charts";

export default function DashboardPage() {
  return (
    <div className="max-w-screen mx-auto w-full pb-10 -mt-24">
      <Suspense fallback={<div>Loading grid...</div>}>
        <DataGrid />
      </Suspense>
      <Suspense fallback={<div>Loading charts...</div>}>
        <DataCharts />
      </Suspense>
    </div>
  );
}
