"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentsIcon from "@mui/icons-material/Payments";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { TriangleUpIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import { PortfolioColumns } from "@/components/portfolio/portfolio-cols";
import PortfolioTable from "@/components/portfolio/portfolio-table";
import { GetTransactionsByPortfolioName } from "@/actions/transaction";
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  NetRevenue,
  NetROI,
  TotalInvestment,
} from "@/utils/portfolio-calculations";

export default function Page({ params }) {
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
      };

      return [...prevTransactions, newTransaction];
    });
  }, []);

  const handleDeleteOperation = useCallback((transactionId) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((item) => item.id !== transactionId)
    );
  }, []);

  const handleBulkDeleteOperation = (transactionsToDelete) => {
    const idsToRemove = new Set(
      transactionsToDelete.map((item) => item.original.id)
    );
    let tempTransactions = transactions.filter(
      (item) => !idsToRemove.has(item.id)
    );

    setTransactions(tempTransactions);
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
          data={transactions}
          handleBulkDeleteOperation={handleBulkDeleteOperation}
        />
      )}
    </>
  );
}
