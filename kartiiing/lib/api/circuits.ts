import {
  ICircuit,
  ICircuitCoordinate,
  IPaginatedResponse,
  ISeoData,
  CircuitsOrderPreset,
} from "@kartiiing/shared";
import { getApiBase, fetchWithTimeout } from "./base";

const MS_DAY = 1000 * 60 * 60 * 24;

/**
 * Fetch circuits with pagination, optional search, and ordering
 */
export async function getCircuits(options?: {
  page?: number;
  limit?: number;
  search?: string;
  preset?: CircuitsOrderPreset;
  latitude?: number;
  longitude?: number;
}): Promise<IPaginatedResponse<ICircuit>> {
  const {
    page = 1,
    limit = 20,
    search,
    preset,
    latitude,
    longitude,
  } = options || {};

  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", limit.toString());
  if (search) params.set("search", search);
  if (preset) params.set("preset", preset);
  if (latitude != null) params.set("userLatitude", latitude.toString());
  if (longitude != null) params.set("userLongitude", longitude.toString());

  const url = `${getApiBase()}/circuits?${params.toString()}`;
  const res = await fetchWithTimeout(url, { next: { revalidate: MS_DAY } });

  if (!res.ok) {
    throw new Error(`Failed to fetch circuits: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch all circuit coordinates
 */
export async function getCircuitCoordinates(
  search?: string,
): Promise<ICircuitCoordinate[]> {
  const params = new URLSearchParams();
  if (search) params.set("search", search);

  const queryString = params.toString();
  const url = `${getApiBase()}/circuits/coordinates${queryString ? `?${queryString}` : ""}`;
  const res = await fetchWithTimeout(url, { next: { revalidate: MS_DAY } });

  if (!res.ok) {
    throw new Error(`Failed to fetch circuit coordinates: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch a single circuit by ID
 */
export async function getCircuitById(id: number): Promise<ICircuit> {
  const url = `${getApiBase()}/circuits/${id}`;
  const res = await fetchWithTimeout(url, { next: { revalidate: MS_DAY } });

  if (!res.ok) {
    throw new Error(`Failed to fetch circuit ${id}: ${res.status}`);
  }

  return res.json();
}

/**
 * Fetch circuits metadata for the circuits page
 */
export async function getCircuitsMetadata(): Promise<ISeoData> {
  const url = `${getApiBase()}/circuits/metadata`;
  const res = await fetchWithTimeout(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch circuits metadata: ${res.status}`);
  }

  return res.json();
}
