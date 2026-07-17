import { redirect } from 'next/navigation';
import { getAvailableYears } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function CalendarPage() {
  const currentYear = new Date().getFullYear();
  let targetYear = currentYear;

  try {
    const availableYears = await getAvailableYears();
    if (availableYears.length > 0) {
      if (availableYears.includes(currentYear)) {
        targetYear = currentYear;
      } else {
        targetYear = Math.max(...availableYears);
      }
    }
  } catch (error) {
    console.error('Error fetching available years:', error);
    // Fall through with currentYear
  }

  redirect(`/calendar/${targetYear}`);
}
