import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useBodyScrollLock } from "../useBodyScrollLock";

const OVERFLOW_HIDDEN = "hidden";
const OVERFLOW_EMPTY = "";

describe("useBodyScrollLock", () => {
  afterEach(() => {
    document.body.style.overflow = OVERFLOW_EMPTY;
  });

  it("sets body overflow to hidden when locked is true", () => {
    renderHook(() => useBodyScrollLock(true));

    expect(document.body.style.overflow).toBe(OVERFLOW_HIDDEN);
  });

  it("sets body overflow to empty string when locked is false", () => {
    renderHook(() => useBodyScrollLock(false));

    expect(document.body.style.overflow).toBe(OVERFLOW_EMPTY);
  });

  it("restores overflow to empty string when locked changes from true to false", () => {
    const { rerender } = renderHook(({ locked }) => useBodyScrollLock(locked), {
      initialProps: { locked: true },
    });

    expect(document.body.style.overflow).toBe(OVERFLOW_HIDDEN);

    rerender({ locked: false });

    expect(document.body.style.overflow).toBe(OVERFLOW_EMPTY);
  });

  it("restores overflow on unmount", () => {
    document.body.style.overflow = OVERFLOW_HIDDEN;

    const { unmount } = renderHook(() => useBodyScrollLock(true));
    unmount();

    expect(document.body.style.overflow).toBe(OVERFLOW_EMPTY);
  });
});
