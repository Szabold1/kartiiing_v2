/** Pixel width below which the section is considered "compact" (matches Tailwind's `md:` breakpoint). */
export const SECTION_COMPACT_BREAKPOINT = 768;

/** Returns true when the given pixel width is in the compact range. */
export function isCompactSection(width: number): boolean {
  return width < SECTION_COMPACT_BREAKPOINT;
}
