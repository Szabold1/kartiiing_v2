import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CircuitsViewMode,
  CIRCUITS_VIEW_MODE_KEY,
} from "@/lib/constants/circuits";

type CircuitsStore = {
  viewMode: CircuitsViewMode;
  setViewMode: (mode: CircuitsViewMode) => void;
};

export const useCircuitsStore = create<CircuitsStore>()(
  persist(
    (set) => ({
      viewMode: CircuitsViewMode.GRID,
      setViewMode: (mode: CircuitsViewMode) => set({ viewMode: mode }),
    }),
    {
      name: CIRCUITS_VIEW_MODE_KEY,
    },
  ),
);
