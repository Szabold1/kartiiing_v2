"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/shared/ErrorState";

type Props = {
  error: Error & { digest?: string };
};

export default function CalendarError({ error }: Props) {
  useEffect(() => {
    console.error("Calendar page error:", error);
  }, [error]);

  return (
    <ErrorState
      title="Something went wrong"
      message="We couldn't load the calendar. Check your internet connection and try again."
    />
  );
}
