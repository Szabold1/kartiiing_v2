"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    // Only scroll if pathname changed (not on first render/refresh)
    if (
      prevPathnameRef.current !== undefined &&
      prevPathnameRef.current !== pathname
    ) {
      window.scrollTo(0, 0);
    }
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}
