"use client";

import React, { createContext, useContext, useEffect } from "react";
import { useServerAction } from "@/hooks/useServerAction";
import { parseCookies, setCookie } from "nookies";
import { GetRef, UpdateRef } from "@/actions/ref";

const UserTypeContext = createContext();

export const UserTypeProvider = ({ children }) => {
  const cookies = parseCookies();
  const refVal = cookies.refVal;
  const userTypeCookie = cookies.userType;

  const { isLoading, data: ref } = useServerAction(GetRef, refVal);
  useEffect(() => {
    if (userTypeCookie) UpdateRef(userTypeCookie.split(" ")[1]);
  }, [userTypeCookie]);

  useEffect(() => {
    if (refVal) UpdateRef(refVal);
  }, [refVal]);

  if (ref) {
    setCookie(null, "userType", `recruiter ${refVal}`, {
      httpOnly: false,
      sameSite: "lax",
      expires: new Date("9999-12-31T23:59:59.000Z"),
    });
  }

  // true generally false for recruiters
  const userType = !(ref || userTypeCookie);

  if (isLoading) return <></>;
  return (
    <UserTypeContext.Provider value={userType}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = () => {
  return useContext(UserTypeContext);
};
