import { ICircuit, IPaginatedResponse, ISeoData } from "@kartiiing/shared";
import { getApiBase } from "./base";

/**
 * Fetch circuits with pagination and optional search
 */
export async function getCircuits(options?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<IPaginatedResponse<ICircuit>> {
  const { page = 1, limit = 20, search } = options || {};

  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", limit.toString());
  if (search) params.set("search", search);

  const url = `${getApiBase()}/circuits?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch circuits: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch circuits metadata for the circuits page
 */
export async function getCircuitsMetadata(): Promise<ISeoData> {
  const url = `${getApiBase()}/circuits/metadata`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch circuits metadata: ${res.status}`);
  }

  return res.json();
}
