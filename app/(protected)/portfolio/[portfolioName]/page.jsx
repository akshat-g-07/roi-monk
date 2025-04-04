"use client";

import { GetTransactionsByPortfolioName } from "@/actions/transaction";
import { useServerAction } from "@/hooks/useServerAction";
import Portfolio from "@/components/portfolio/portfolio";
import Loading from "@/components/common/loading";
import Error from "@/components/common/error";
import { GetPortfolioByName } from "@/actions/portfolio";

export default function Page({ params }) {
  const { portfolioName } = params;
  const { data: portfolio } = useServerAction(
    GetPortfolioByName,
    decodeURI(portfolioName)
  );

  if (!portfolio)
    return (
      <div className="grid size-full items-center justify-center">
        <p className="w-fit">
          Portfolio with {decodeURI(portfolioName)} name doesn't exist.
        </p>
      </div>
    );
  const {
    isLoading,
    data: originalTransactions,
    error,
    refetch,
  } = useServerAction(GetTransactionsByPortfolioName, decodeURI(portfolioName));

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Portfolio
        portfolioName={decodeURI(portfolioName)}
        originalTransactions={originalTransactions}
        handleRefetch={refetch}
      />
    </>
  );
}
