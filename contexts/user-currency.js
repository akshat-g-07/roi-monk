"use client";

import React, { createContext, useContext } from "react";
import { useServerAction } from "@/hooks/useServerAction";
import { GetUser } from "@/actions/user";

const UserCurrencyContext = createContext();

export const UserCurrencyProvider = ({ children }) => {
  const { isLoading, data: user } = useServerAction(GetUser);

  const userCurrency = user?.currency || "USD"; // Default to USD if user or currency is not available

  if (isLoading) return <></>;
  return (
    <UserCurrencyContext.Provider value={userCurrency}>
      {children}
    </UserCurrencyContext.Provider>
  );
};

// Supplies a fixed currency (no auth call) for public demo pages such as /examples.
export const StaticUserCurrencyProvider = ({
  currency = "United States - USD",
  children,
}) => {
  return (
    <UserCurrencyContext.Provider value={currency}>
      {children}
    </UserCurrencyContext.Provider>
  );
};

export const useUserCurrency = () => {
  return useContext(UserCurrencyContext);
};
