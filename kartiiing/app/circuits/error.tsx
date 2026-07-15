"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/shared/ErrorState";

type Props = {
  error: Error & { digest?: string };
};

export default function CircuitsError({ error }: Props) {
  useEffect(() => {
    console.error("Circuits page error:", error);
  }, [error]);

  return (
    <ErrorState
      title="Something went wrong"
      message="We couldn't load the circuits. Check your internet connection and try again."
    />
  );
}
