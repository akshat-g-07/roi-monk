"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { TriangleUpIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import { PortfolioColumns } from "@/components/portfolio/portfolio-cols";
import PortfolioTable from "@/components/portfolio/portfolio-table";
import {
  GetTransactionsByPortfolioName,
  UpdateTransactions,
} from "@/actions/transaction";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  NetRevenue,
  NetROI,
  TotalInvestment,
} from "@/data/portfolio-calculations";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Page({ params }) {
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

      return {
        errors: errors,
        values: values,
      };
    },
  });
  const { portfolioName } = params;
  const [transactions, setTransactions] = useState([]);
  const totalInvestment = TotalInvestment(transactions);
  const netRevenue = NetRevenue(transactions);
  const netROI = NetROI(transactions);

  useEffect(() => {
    async function getTransactions() {
      const transactionsData = await GetTransactionsByPortfolioName(
        portfolioName
      );
      if (transactionsData.data) setTransactions(transactionsData.data);
    }

    getTransactions();
  }, [portfolioName]);

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

      return [...prevTransactions, newTransaction];
    });
  }, []);

  const handleDeleteOperation = useCallback((transactionId) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((item) =>
        item.id === transactionId ? { ...item, status: "DELETE" } : item
      )
    );
  }, []);

  const handleBulkDeleteOperation = (transactionsToDelete) => {
    const idsToRemove = transactionsToDelete.map((item) => item.original.id);

    setTransactions((prevTransactions) =>
      prevTransactions.map((item) =>
        idsToRemove.includes(item.id) ? { ...item, status: "DELETE" } : item
      )
    );
  };

  const handleAddTransaction = (values) => {
    let tempValues = {
      ...values,
      id: Date.now() + "",
      type: values.type === "Credit" ? "CR" : "DR",
    };
    let tempTransactions = [tempValues, ...transactions];
    setTransactions(tempTransactions);
    form.reset();
  };

  const handleSaveOperation = async () => {
    const result = await UpdateTransactions(portfolioName, transactions);

    if (result.message === "success") {
      toast.success("Successfully Updated");
      const updatedTransactions = await GetTransactionsByPortfolioName(
        portfolioName
      );
      if (updatedTransactions.data) setTransactions(updatedTransactions.data);
    } else if (result.message === "error") {
      toast.error(`Uh oh! Something went wrong.\nPlease try again.`);
    } else {
      toast.error(`Portfolio doesn't exist.`);
    }
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
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
        {/* 
        Total Investment Card
         */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Total Investment
              <MonetizationOnIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            <p>$ {totalInvestment}</p>
          </CardContent>
        </Card>
        {/* 
        Revenue Card
         */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Net Revenue
              <PaymentsIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            <p>$ {netRevenue}</p>
            <p>
              {netRevenue > 0 ? (
                <TriangleUpIcon className="text-emerald-500 size-7" />
              ) : (
                netRevenue < 0 && (
                  <TriangleDownIcon className="text-red-500 size-7" />
                )
              )}
            </p>
          </CardContent>
        </Card>
        {/* 
        Net ROI Card
         */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between text-base font-normal items-center">
              Net ROI
              <CurrencyExchangeIcon />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between text-xl font-semibold items-center">
            <p>{netROI} %</p>
            <p>
              {netROI > 0 ? (
                <TriangleUpIcon className="text-emerald-500 size-7" />
              ) : (
                netROI < 0 && (
                  <TriangleDownIcon className="text-red-500 size-7" />
                )
              )}
            </p>
          </CardContent>
        </Card>
      </div>
      {transactions && (
        <PortfolioTable
          columns={PortfolioColumnsWithOperations}
          data={transactions.filter(
            (transaction) => transaction.status !== "DELETE"
          )}
          handleBulkDeleteOperation={handleBulkDeleteOperation}
          form={form}
          handleAddTransaction={handleAddTransaction}
          handleSaveOperation={handleSaveOperation}
        />
      )}
    </>
  );
}
