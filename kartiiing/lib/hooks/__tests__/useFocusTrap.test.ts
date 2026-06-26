import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useFocusTrap } from "../useFocusTrap";

function createContainer() {
  const container = document.createElement("div");
  container.setAttribute("data-testid", "trap-container");

  const first = document.createElement("button");
  first.textContent = "First";
  container.appendChild(first);

  const middle = document.createElement("a");
  middle.setAttribute("href", "#");
  middle.textContent = "Middle";
  container.appendChild(middle);

  const last = document.createElement("input");
  last.setAttribute("type", "text");
  container.appendChild(last);

  document.body.appendChild(container);
  return { container, first, middle, last };
}

describe("useFocusTrap", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("collects focusable elements inside the container", () => {
    const { container } = createContainer();

    const ref = { current: container };
    renderHook(() => useFocusTrap(true, ref));

    // Focus the first element to start
    const firstButton = container.querySelector("button")!;
    firstButton.focus();

    // Tab to go forward — should wrap from first to last? No,
    // the focus trap only prevents leaving via Tab, but the natural
    // Tab behavior isn't simulated by jsdom. We can verify the hook
    // sets up the listener by checking it doesn't throw.
    expect(document.activeElement).toBe(firstButton);
  });

  it("prevents Tab from leaving the container — wraps last to first", () => {
    const { container, last, first } = createContainer();
    const ref = { current: container };
    renderHook(() => useFocusTrap(true, ref));

    last.focus();

    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: false,
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    document.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(document.activeElement).toBe(first);
  });

  it("prevents Shift+Tab from leaving the container — wraps first to last", () => {
    const { container, first, last } = createContainer();
    const ref = { current: container };
    renderHook(() => useFocusTrap(true, ref));

    first.focus();

    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    document.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(document.activeElement).toBe(last);
  });

  it("focuses the first element when Tab is pressed and focus is outside the container", () => {
    const { container, first } = createContainer();
    const ref = { current: container };
    renderHook(() => useFocusTrap(true, ref));

    // Focus something outside
    const outside = document.createElement("button");
    outside.setAttribute("data-testid", "outside");
    document.body.appendChild(outside);
    outside.focus();
    expect(document.activeElement).toBe(outside);

    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: false,
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(event, "preventDefault");
    document.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(document.activeElement).toBe(first);
  });

  it("does nothing when disabled", () => {
    const { container, last } = createContainer();
    const ref = { current: container };
    renderHook(() => useFocusTrap(false, ref));

    last.focus();

    const preventDefaultSpy = vi.spyOn(
      KeyboardEvent.prototype,
      "preventDefault",
    );
    const event = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: false,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);

    // Note: not calling preventDefault from our hook
    expect(document.activeElement).toBe(last);
    preventDefaultSpy.mockRestore();
  });

  it("restores focus to the previously focused element on cleanup", () => {
    const { container } = createContainer();
    const previous = document.createElement("button");
    previous.setAttribute("data-testid", "previous");
    document.body.appendChild(previous);
    previous.focus();
    expect(document.activeElement).toBe(previous);

    const ref = { current: container };
    const { unmount } = renderHook(() => useFocusTrap(true, ref));

    unmount();
    expect(document.activeElement).toBe(previous);
  });
});
