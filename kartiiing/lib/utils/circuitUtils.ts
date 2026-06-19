import { ICircuit } from "@kartiiing/shared";

/**
 * Get a human-readable display string for the circuit length(s).
 *
 * - If a layout is marked as `current`, shows its name and length
 *   (e.g. "Layout 2 • 1070 meters")
 * - Otherwise shows the length range across all layouts
 *   (e.g. "900 - 1500 meters" or "1200 meters" for a single layout)
 * - Falls back to `circuit.length` if no layouts exist
 */
export function getCircuitLengthDisplay(circuit: ICircuit): string {
  const currentLayout = circuit.layouts?.find((l) => l.current);

  // If there's a current layout, show its name and length
  if (currentLayout) {
    const namePart = currentLayout.name ? `${currentLayout.name} • ` : "";
    return `${namePart}${currentLayout.length} meters`;
  }

  // No current layout — show length range across all layouts
  if (!circuit.layouts || circuit.layouts.length === 0) {
    return circuit.length > 0 ? `${circuit.length} meters` : "Unknown length";
  }

  const lengths = circuit.layouts.map((l) => l.length).filter((l) => l > 0);
  if (lengths.length === 0) return "Unknown length";

  const min = Math.min(...lengths);
  const max = Math.max(...lengths);

  return min === max ? `${min} meters` : `${min} - ${max} meters`;
}
