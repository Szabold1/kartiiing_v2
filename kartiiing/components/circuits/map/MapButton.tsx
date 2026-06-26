"use client";

import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { cn, lightDarkGlassHover } from "@/lib/utils";

interface Props {
  onClick: () => void;
  className?: string;
}

export default function MapButton({ onClick, className = "" }: Props) {
  return (
    <Button
      variant="outline"
      aria-label="Open map view"
      className={cn("w-10.5 h-10.5 rounded-lg", lightDarkGlassHover, className)}
      onClick={onClick}
      title="Open map"
    >
      <Map className="size-4" />
    </Button>
  );
}
