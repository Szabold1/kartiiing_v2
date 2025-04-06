import { NextResponse } from "next/server";
import { getUpcomingRaces } from "@/lib/db";
import { formatRaceData } from "@/lib/utils";

export async function GET() {
  try {
    const rawRaces = await getUpcomingRaces();
    return NextResponse.json(formatRaceData(rawRaces));
  } catch (error) {
    console.error("Error fetching races:", error);
    return NextResponse.json(
      { error: "Failed to fetch races" },
      { status: 500 }
    );
  }
}
