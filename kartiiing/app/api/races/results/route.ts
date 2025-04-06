import { NextResponse } from "next/server";
import { getPastRaces } from "@/lib/db";
import { formatRaceData } from "@/lib/utils";

export async function GET() {
  try {
    const rawRaces = await getPastRaces(true);
    return NextResponse.json(formatRaceData(rawRaces));
  } catch (error) {
    console.error("Error fetching races with results:", error);
    return NextResponse.json(
      { error: "Failed to fetch races with results" },
      { status: 500 }
    );
  }
}
