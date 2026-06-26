"use client";

import { useEffect } from "react";

/**
 * Fires a callback when the Escape key is pressed, while enabled.
 * Typical use: closing modals, drawers, sheets on Escape.
 */
export function useEscapeKey(enabled: boolean, callback: () => void) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        callback();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enabled, callback]);
}
