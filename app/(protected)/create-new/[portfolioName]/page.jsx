import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page({ params }) {
  const { portfolioName } = params;
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
  ];
  return (
    <>
      <div className="w-full min-h-full">
        <p className="text-2xl font-semibold">{portfolioName}</p>
        <>
          <Card className="mt-10 p-4">
            <Table>
              <TableHeader className="bg-muted">
                <TableRow>
                  <TableHead className="w-[50px]">Type</TableHead>
                  <TableHead className="w-[200px]">Transaction Name</TableHead>
                  <TableHead className="w-[200px]">Amount</TableHead>
                  <TableHead className="w-[200px]">Date</TableHead>
                  <TableHead className="w-[200px]">Category</TableHead>
                  <TableHead className="w-fit">Comments</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="w-[50px]">Type</TableCell>
                    <TableCell className="w-[200px]">
                      Transaction Name
                    </TableCell>
                    <TableCell className="w-[200px]">Amount</TableCell>
                    <TableCell className="w-[200px]">Date</TableCell>
                    <TableCell className="w-[200px]">Category</TableCell>
                    <TableCell className="w-fit">Comments</TableCell>
                    <TableCell className="w-[50px]">Actions</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </>
      </div>
    </>
  );
}
