import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CalendarViewMode,
  CALENDAR_VIEW_MODE_KEY,
} from "@/lib/constants/calendar";

type CalendarStore = {
  viewMode: CalendarViewMode;
  setViewMode: (mode: CalendarViewMode) => void;
};

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set) => ({
      viewMode: CalendarViewMode.GRID,
      setViewMode: (mode: CalendarViewMode) => set({ viewMode: mode }),
    }),
    {
      name: CALENDAR_VIEW_MODE_KEY,
    },
  ),
);
