"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { parseCookies } from "nookies";

const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
  const [userType, setUserType] = useState(undefined);

  useEffect(() => {
    const cookies = parseCookies();
    const ref = cookies.ref;
    // true generally false for recruiters
    setUserType(ref !== "rec");
  }, []);

  if (userType == undefined) return <></>;

  return (
    <UserTypeContext.Provider value={userType}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = () => {
  return useContext(UserTypeContext);
};
