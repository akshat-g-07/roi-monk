"use client";

import _ from "lodash";
import { PortfolioColumns } from "@/components/portfolio/portfolio-cols";
import PortfolioTable from "@/components/portfolio/portfolio-table";
import { DeleteTransaction, UpdateTransactions } from "@/actions/transaction";
import { useMemo, useState, useCallback } from "react";
import { NetRevenue, TotalInvestment } from "@/data/portfolio-calculations";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SummaryCards from "@/components/common/summary-cards";

export default function Portfolio({
  portfolioName,
  originalTransactions,
  handleRefetch,
}) {
  const form = useForm({
    defaultValues: {
      amount: "",
      comments: "",
      transactionDate: "",
      transactionName: "",
      type: "",
    },
    resolver: async (values) => {
      const errors = {};
      const { amount, comments, transactionDate, transactionName, type } =
        values;

      if (!type) {
        errors.type = {
          type: "required",
          message: "Type is required.",
        };
      }

      const nameRegex = /^[a-zA-Z0-9\s\-_]*$/;
      if (!transactionName) {
        errors.transactionName = {
          type: "required",
          message: "Name is required.",
        };
      } else if (!nameRegex.test(transactionName)) {
        errors.transactionName = {
          type: "validation",
          message: "Name can only have a-z, A-Z, 0-9, space, -, _.",
        };
      }

      if (!amount) {
        errors.amount = {
          type: "required",
          message: "Amount is required.",
        };
      } else if (amount <= 0) {
        errors.amount = {
          type: "validation",
          message: "Amount should be a postive number.",
        };
      } else if (amount.toString().split(".")[1]?.length > 2) {
        errors.amount = {
          type: "validation",
          message: "Amount should have only two decimal values.",
        };
      }

      if (!transactionDate) {
        errors.transactionDate = {
          type: "required",
          message: "Date is required.",
        };
      }

      const commentRegex = /^[a-zA-Z0-9\s.'"&,!?\-_]*$/;
      if (!commentRegex.test(comments)) {
        errors.comments = {
          type: "validation",
          message: `Comments can only have a-z, A-Z, 0-9, space, ., ', ", &, !, ?, -, _.`,
        };
      }

      values.amount = parseFloat(values.amount);

      return {
        errors: errors,
        values: values,
      };
    },
  });
  const [transactions, setTransactions] = useState(originalTransactions);
  const hasChanges = _.isEqual(transactions, originalTransactions);
  const { totalInvestment, netRevenue, netROI } = useMemo(() => {
    if (!transactions || transactions.length === 0) {
      return {
        totalInvestment: 0,
        netRevenue: 0,
        netROI: 0,
      };
    }
    const totalInv = TotalInvestment(transactions);
    const netRev = NetRevenue(transactions);

    const roi = ((netRev - totalInv) / totalInv) * 100 || 0;

    return {
      totalInvestment: totalInv,
      netRevenue: netRev,
      netROI: roi === 0 ? 0 : parseFloat(roi).toFixed(2),
    };
  }, [transactions]);

  const handleEditOperation = useCallback(
    (transactionId, transactionValues) => {
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === transactionId
            ? { ...transaction, ...transactionValues }
            : transaction
        )
      );
    },
    []
  );

  const handleCopyOperation = useCallback((transactionId) => {
    setTransactions((prevTransactions) => {
      const transactionToCopy = prevTransactions.find(
        (item) => item.id === transactionId
      );
      if (!transactionToCopy) return prevTransactions;

      const newTransaction = {
        ...transactionToCopy,
        id: `${transactionId}_${Date.now()}_copy`,
        transactionName: transactionToCopy.transactionName + " copy",
      };

      return [newTransaction, ...prevTransactions];
    });
  }, []);

  const handleDeleteOperation = useCallback((transactionId) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((item) => item.id !== transactionId)
    );
  }, []);

  const handleBulkDeleteOperation = (transactionsToDelete) => {
    const idsToRemove = transactionsToDelete.map((item) => item.original.id);

    setTransactions((prevTransactions) =>
      prevTransactions.filter((item) => !idsToRemove.includes(item.id))
    );
  };

  const handleAddTransaction = (values) => {
    let tempValues = {
      ...values,
      id: Date.now().toString(),
      type: values.type === "Credit" ? "CR" : "DR",
    };
    setTransactions((prev) => [tempValues, ...prev]);
    form.reset();
  };

  const handleSaveOperation = async () => {
    const deleteTransactions = originalTransactions.filter(
      (originalTransaction) =>
        !transactions
          .map((transaction) => transaction.id)
          .includes(originalTransaction.id)
    );

    const upsertTransactions = transactions.filter(
      (transaction) =>
        !originalTransactions.find((originalTransaction) =>
          _.isEqual(originalTransaction, transaction)
        )
    );

    const deleteResult =
      deleteTransactions.length > 0
        ? DeleteTransaction(deleteTransactions.map((item) => item.id))
        : Promise.resolve({ message: "success" });

    const upsertResult =
      upsertTransactions.length > 0
        ? UpdateTransactions(portfolioName, upsertTransactions)
        : Promise.resolve({ message: "success" });

    await Promise.all([deleteResult, upsertResult]).then(async (values) => {
      if (values[0].message === "success" && values[1].message === "success") {
        toast.success("Successfully Updated");
        await handleRefetch();
      } else if (values[1].message === "Portfolio Not Found") {
        toast.error(`Portfolio doesn't exist.`);
      } else {
        toast.error(`Uh oh! Something went wrong.\nPlease try again.`);
      }
    });
  };

  const PortfolioColumnsWithOperations = useMemo(
    () =>
      PortfolioColumns(
        handleEditOperation,
        handleCopyOperation,
        handleDeleteOperation
      ),
    [handleEditOperation, handleCopyOperation, handleDeleteOperation]
  );

  return (
    <>
      <SummaryCards
        totalInvestment={totalInvestment}
        netRevenue={netRevenue}
        netROI={netROI}
      />

      <PortfolioTable
        columns={PortfolioColumnsWithOperations}
        data={transactions}
        handleBulkDeleteOperation={handleBulkDeleteOperation}
        form={form}
        handleAddTransaction={handleAddTransaction}
        handleSaveOperation={handleSaveOperation}
        hasChanges={hasChanges}
      />
    </>
  );
}
