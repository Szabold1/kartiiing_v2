"use client";

import { cn, noBlurGlassBase } from "@/lib/utils";

type Props = {
  className?: string;
};

export function MapNoResults({ className = "" }: Props) {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex items-center justify-center pointer-events-none",
        className,
      )}
    >
      <div className={cn("px-4 py-2 rounded-lg", noBlurGlassBase)}>
        <p className="text-sm text-muted-foreground font-medium">
          No circuits match your search
        </p>
      </div>
    </div>
  );
}
