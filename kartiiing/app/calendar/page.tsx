import { redirect } from "next/navigation";

export default async function CalendarPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || ""}/api/race-events/years`
  );
  const years: number[] = await res.json();

  const currentYear = new Date().getFullYear();
  if (years?.includes(currentYear)) {
    redirect(`/calendar/${currentYear}`);
  }
  if (years?.length > 0) {
    const targetYear = Math.max(...years);
    redirect(`/calendar/${targetYear}`);
  }
}
