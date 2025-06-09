import { get2024RaceEvents } from "./data2024RaceEvents";
import { get2025RaceEvents } from "./data2025RaceEvents";

export function getAllRaceEvents() {
  return [...get2024RaceEvents(), ...get2025RaceEvents()];
}
