"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | undefined>(undefined);
  const isPopStateRef = useRef(false);

  // Track popstate events (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      isPopStateRef.current = true;
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useLayoutEffect(() => {
    // Only scroll if pathname changed and it's not a back/forward navigation
    if (
      prevPathnameRef.current !== undefined &&
      prevPathnameRef.current !== pathname &&
      !isPopStateRef.current
    ) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }

    // Reset popstate flag after pathname change
    isPopStateRef.current = false;
    prevPathnameRef.current = pathname;
  }, [pathname]);

  return null;
}
