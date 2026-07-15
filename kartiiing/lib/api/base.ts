const FETCH_TIMEOUT_MS = 10_000;

/**
 * Get the base URL for API requests
 */
export function getApiBase(): string {
  const base = process.env.NEXT_PUBLIC_API_URL || "/api";
  return base.replace(/\/$/, "");
}

/**
 * Wrapper around fetch with a timeout via AbortController.
 * Throws on network error, HTTP !ok, or timeout.
 */
export async function fetchWithTimeout(
  url: string,
  options?: RequestInit & { timeoutMs?: number },
): Promise<Response> {
  const { timeoutMs = FETCH_TIMEOUT_MS, ...fetchOptions } = options || {};
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return res;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
