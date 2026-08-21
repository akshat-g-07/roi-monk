"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import SummaryCards from "@/components/common/summary-cards";
import PortfolioTable from "@/components/portfolio/portfolio-table";
import { PortfolioColumns } from "@/components/portfolio/portfolio-cols";
import { NetRevenue, TotalInvestment } from "@/data/portfolio-calculations";
import { StaticUserCurrencyProvider } from "@/contexts/user-currency";
import { Slide, toast } from "react-toastify";

// Interactive demo of the real portfolio view backed by synthetic data.
// Edits stay in memory and "Save" routes to sign-up, so no auth-protected
// server action ever runs from these public pages.
export default function ExamplePortfolioView({ initialTransactions }) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      amount: "",
      comments: "",
      transactionDate: "",
      transactionName: "",
      type: "",
    },
  });

  const [transactions, setTransactions] = useState(() =>
    initialTransactions.map((transaction) => ({
      ...transaction,
      // Parse date-only strings as local midnight so SSR and client render the
      // same calendar date regardless of timezone (avoids hydration mismatch).
      transactionDate: new Date(`${transaction.transactionDate}T00:00:00`),
    })),
  );

  const { totalInvestment, netRevenue, netROI } = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return { totalInvestment: 0, netRevenue: 0, netROI: 0 };
    }
    const totalInv = TotalInvestment(transactions);
    const netRev = NetRevenue(transactions);
    const roi = ((netRev - totalInv) / totalInv) * 100 || 0;
    return {
      totalInvestment: totalInv,
      netRevenue: netRev,
      netROI: roi === 0 ? 0 : parseFloat(roi.toFixed(2)),
    };
  }, [transactions]);

  const handleEditOperation = useCallback((transactionId, values) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === transactionId
          ? { ...transaction, ...values }
          : transaction,
      ),
    );
  }, []);

  const handleCopyOperation = useCallback((transactionId) => {
    setTransactions((prev) => {
      const found = prev.find(
        (transaction) => transaction.id === transactionId,
      );
      if (!found) return prev;
      return [
        {
          ...found,
          id: `${transactionId}_${Date.now()}_copy`,
          transactionName: `${found.transactionName} copy`,
        },
        ...prev,
      ];
    });
  }, []);

  const handleDeleteOperation = useCallback((transactionId) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== transactionId),
    );
  }, []);

  const handleBulkDeleteOperation = (rows) => {
    const ids = rows.map((row) => row.original.id);
    setTransactions((prev) =>
      prev.filter((transaction) => !ids.includes(transaction.id)),
    );
  };

  const handleAddTransaction = (values) => {
    setTransactions((prev) => [
      {
        ...values,
        id: Date.now().toString(),
        amount: parseFloat(values.amount),
        type:
          values.type === "Credit"
            ? "CR"
            : values.type === "Debit"
              ? "DR"
              : values.type,
        transactionDate: new Date(values.transactionDate),
      },
      ...prev,
    ]);
    form.reset();
  };

  const columns = useMemo(
    () =>
      PortfolioColumns(
        handleEditOperation,
        handleCopyOperation,
        handleDeleteOperation,
      ),
    [handleEditOperation, handleCopyOperation, handleDeleteOperation],
  );

  return (
    <StaticUserCurrencyProvider>
      <div className="space-y-6">
        <SummaryCards
          totalInvestment={totalInvestment}
          netRevenue={netRevenue}
          netROI={netROI}
          isLoading={false}
        />
        <PortfolioTable
          columns={columns}
          data={transactions}
          handleBulkDeleteOperation={handleBulkDeleteOperation}
          form={form}
          handleAddTransaction={handleAddTransaction}
          handleSaveOperation={() => {
            toast.dismiss();
            toast.info(
              <span>
                This is a demo. To save your portfolio, please{" "}
                <Link
                  href="/sign-up"
                  className="font-semibold underline underline-offset-2"
                >
                  SIGN UP!
                </Link>
                .
              </span>,
              {
                position: "bottom-center",
                autoClose: 10000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                transition: Slide,
              },
            );
          }}
          hasChanges={false}
          isLoading={false}
        />
      </div>
    </StaticUserCurrencyProvider>
  );
}
