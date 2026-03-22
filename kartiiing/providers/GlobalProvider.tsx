"use client";

import { createContext, useContext } from "react";

interface GlobalContextValue {
  currentYear: number;
}

const GlobalContext = createContext<GlobalContextValue>({
  currentYear: new Date().getFullYear(),
});

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function useCurrentYear() {
  return useContext(GlobalContext).currentYear;
}

interface Props {
  value: GlobalContextValue;
  children: React.ReactNode;
}

export function GlobalProvider({ value, children }: Props) {
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
