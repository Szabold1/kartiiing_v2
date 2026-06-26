"use client";

import { useEffect, useCallback } from "react";

/**
 * Traps Tab / Shift+Tab focus within the provided element when enabled.
 * Does NOT auto-focus anything — the user just tabs naturally from where
 * focus already is. Restores focus to the previously focused element on disable.
 *
 * @param enabled       Whether the trap is active (modal open, etc.)
 * @param containerRef  Ref to the container element that should trap focus
 */
export function useFocusTrap(
  enabled: boolean,
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const getFocusable = useCallback(() => {
    const container = containerRef.current;
    if (!container) return [];
    return Array.from(
      container.querySelectorAll<HTMLElement>(
        [
          "a[href]",
          "button:not([disabled])",
          "textarea:not([disabled])",
          "input:not([disabled])",
          "select:not([disabled])",
          '[tabindex]:not([tabindex="-1"])',
        ].join(", "),
      ),
    );
  }, [containerRef]);

  useEffect(() => {
    if (!enabled) return;

    const previousFocus = document.activeElement as HTMLElement | null;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const container = containerRef.current;
      if (!container) return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      // If focus is outside the container, Tab should go to the first element inside
      if (!container.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }

      // Wrap around within the container
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [enabled, getFocusable]);
}
