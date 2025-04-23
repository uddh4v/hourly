// import { DataTable } from "@/components/dashboard/data-table";
import { DataTableDemo } from "./table/data-table";
// import data from "../timesheet/data.json";

export default function Timesheet() {
  return (
    <div className="pt-10">
      <DataTableDemo />
      {/* <DataTable data={data} /> */}
    </div>
  );
}
