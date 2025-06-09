import { get2024RaceWeekends } from "./data2024RaceWeekends";
import { get2025RaceWeekends } from "./data2025RaceWeekends";

export async function getAllRaceWeekends() {
  return [...(await get2024RaceWeekends()), ...(await get2025RaceWeekends())];
}
