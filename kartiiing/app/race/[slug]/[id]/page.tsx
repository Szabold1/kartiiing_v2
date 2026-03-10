import { getRaceEventById } from "@/lib/api";
import RaceDetails from "@/components/race/RaceDetails";
import ErrorState from "@/components/shared/ErrorState";

interface Props {
  params: Promise<{
    slug: string;
    id: string;
  }>;
}

export default async function RaceDetailPage({ params }: Props) {
  const { id: idStr } = await params;

  try {
    const id = parseInt(idStr, 10);

    if (isNaN(id)) {
      return <ErrorState message="Invalid race event ID" />;
    }

    const race = await getRaceEventById(id);
    return <RaceDetails race={race} />;
  } catch {
    return <ErrorState message="Failed to load race event." />;
  }
}
