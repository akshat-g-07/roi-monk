import { payments } from "@/data/payments";
import { columns } from "@/lib/payment-cols";
import { DataTable } from "./data-table";

export default function OverviewDataTable() {
  return (
    <>
      <DataTable columns={columns} data={payments} />
    </>
  );
}
