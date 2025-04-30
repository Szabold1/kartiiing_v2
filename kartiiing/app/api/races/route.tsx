import { NextRequest, NextResponse } from "next/server";
import { getRaces } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");

    const races = await getRaces(year ?? undefined);

    return NextResponse.json(races);
  } catch (error) {
    console.error("Error fetching races:", error);
    return NextResponse.json(
      { error: "Failed to fetch races" },
      { status: 500 }
    );
  }
}