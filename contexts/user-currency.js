"use client";

import React, { createContext, useContext } from "react";
import { useServerAction } from "@/hooks/useServerAction";
import { GetUser } from "@/actions/user";

const UserCurrencyContext = createContext();

export const UserCurrencyProvider = ({ children }) => {
  const { isLoading, data: user } = useServerAction(GetUser);

  if (isLoading) return <></>;
  return (
    <UserCurrencyContext.Provider value={user.currency}>
      {children}
    </UserCurrencyContext.Provider>
  );
};

export const useUserCurrency = () => {
  return useContext(UserCurrencyContext);
};
