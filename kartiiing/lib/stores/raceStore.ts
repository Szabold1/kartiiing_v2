import { create } from "zustand";
import { IRaceEventDetail } from "@kartiiing/shared-types";

type RaceStore = {
  race: IRaceEventDetail | null;
  setRace: (race: IRaceEventDetail) => void;
};

export const useRaceStore = create<RaceStore>((set) => ({
  race: null,
  setRace: (race: IRaceEventDetail) => set({ race }),
}));
