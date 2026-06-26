"use client";

import { useEffect } from "react";

/**
 * Lock/unlock body scroll based on a boolean.
 * Restores the previous overflow value on cleanup.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (locked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
