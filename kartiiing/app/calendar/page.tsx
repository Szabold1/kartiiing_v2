import { redirect } from "next/navigation";
import { getAvailableYears } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  const availableYears = await getAvailableYears();
  const currentYear = new Date().getFullYear();
  let targetYear = currentYear;

  if (availableYears.length > 0) {
    if (availableYears.includes(currentYear)) {
      targetYear = currentYear;
    } else {
      targetYear = Math.max(...availableYears);
    }
  }
  redirect(`/calendar/${targetYear}`);
}
