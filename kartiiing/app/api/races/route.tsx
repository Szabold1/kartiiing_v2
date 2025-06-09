import { NextRequest, NextResponse } from "next/server";
import { getRaces, groupRaceEvents } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");

    const races = await getRaces(year ?? undefined);
    const grouped = groupRaceEvents(races);

    return NextResponse.json(grouped);
  } catch (error) {
    console.error("Error fetching races:", error);
    return NextResponse.json(
      { error: "Failed to fetch races" },
      { status: 500 }
    );
  }
}
