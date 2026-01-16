"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { getRaceEventBySlug } from "@/lib/api";
import { IRaceEventDetail } from "@kartiiing/shared-types";
import RaceDetails from "./RaceDetails";
import Loader from "../Loader";

export default function RaceSheet() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("race");

  const [race, setRace] = useState<IRaceEventDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setRace(null);
      setError(null);
      return;
    }

    const fetchRace = async () => {
      setLoading(true);
      setError(null);
      try {
        const raceData = await getRaceEventBySlug(slug);
        setRace(raceData);
      } catch (err) {
        console.error("Error loading race event:", err);
        setError("Failed to load race event");
      } finally {
        setLoading(false);
      }
    };

    fetchRace();
  }, [slug]);

  const handleClose = () => {
    router.back();
  };

  return (
    <Sheet open={!!slug} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto"
        showCloseButton={false}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Race Event Details</SheetTitle>
        </SheetHeader>

        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader />
          </div>
        )}

        {error && !loading && (
          <div className="p-6">
            <SheetHeader className="sr-only">
              <SheetTitle>Error</SheetTitle>
            </SheetHeader>
            <div className="text-center py-10">
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        )}

        {race && !loading && !error && (
          <RaceDetails race={race} onClose={handleClose} />
        )}
      </SheetContent>
    </Sheet>
  );
}
