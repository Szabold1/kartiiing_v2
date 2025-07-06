"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";

interface RaceContextType {
  races: RaceEventGrouped[];
}

const RaceContext = createContext<RaceContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
  races: RaceEventGrouped[];
}

export function RaceProvider({ children, races }: Props) {
  return (
    <RaceContext.Provider value={{ races }}>
      {children}
    </RaceContext.Provider>
  );
}

export function useRaceContext() {
  const context = useContext(RaceContext);
  if (context === undefined) {
    throw new Error("useRaceContext must be used within a RaceProvider");
  }
  return context;
}
