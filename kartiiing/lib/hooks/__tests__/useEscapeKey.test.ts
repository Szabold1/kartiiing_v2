import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useEscapeKey } from "../useEscapeKey";

describe("useEscapeKey", () => {
  it("fires callback when Escape key is pressed and enabled is true", () => {
    const callback = vi.fn();

    renderHook(() => useEscapeKey(true, callback));

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not fire callback when enabled is false", () => {
    const callback = vi.fn();

    renderHook(() => useEscapeKey(false, callback));

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(callback).not.toHaveBeenCalled();
  });

  it("does not fire callback for non-Escape keys", () => {
    const callback = vi.fn();

    renderHook(() => useEscapeKey(true, callback));

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab" }));

    expect(callback).not.toHaveBeenCalled();
  });

  it("removes event listener on unmount", () => {
    const callback = vi.fn();

    const { unmount } = renderHook(() => useEscapeKey(true, callback));
    unmount();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(callback).not.toHaveBeenCalled();
  });

  it("uses the latest callback when it changes", () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { rerender } = renderHook(
      ({ enabled, cb }) => useEscapeKey(enabled, cb),
      { initialProps: { enabled: true, cb: callback1 } },
    );

    rerender({ enabled: true, cb: callback2 });

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
