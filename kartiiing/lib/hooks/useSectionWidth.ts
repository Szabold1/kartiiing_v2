"use client";

import { useRef, useLayoutEffect, useState } from "react";

export function useSectionWidth() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionWidth, setSectionWidth] = useState(0);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    function updateWidth() {
      if (sectionRef.current) setSectionWidth(sectionRef.current.offsetWidth);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return { sectionRef, sectionWidth };
}
