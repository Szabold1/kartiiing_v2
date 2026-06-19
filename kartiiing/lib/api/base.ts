/**
 * Get the base URL for API requests
 */
export function getApiBase(): string {
  const base = process.env.NEXT_PUBLIC_API_URL || "/api";
  return base.replace(/\/$/, "");
}
