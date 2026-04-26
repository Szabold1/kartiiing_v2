import {
  ICountry,
  ICircuit,
  ICircuitDetail,
  ICircuitLayout,
  IFastestLap,
  IRaceEvent,
  IRaceEventDetail,
  IRaceEventDate,
  IChampionship,
  IResultsLink,
  ISeoData,
} from "@kartiiing/shared-types";

// ─── Primitives ───────────────────────────────────────────────────────────────

export function buildCountry(o: Partial<ICountry> = {}): ICountry {
  return { id: 1, name: "Hungary", code: "HU", ...o };
}

export function buildResultsLink(o: Partial<IResultsLink> = {}): IResultsLink {
  return { category: "KZ", url: "https://results.com/kz", ...o };
}

export function buildChampionship(
  o: Partial<IChampionship> = {},
): IChampionship {
  return {
    id: 1,
    name: "FIA European Championship",
    roundNumber: 1,
    ...o,
  };
}

export function buildSeoData(o: Partial<ISeoData> = {}): ISeoData {
  return {
    title: "Test Race",
    description: "Test description",
    keywords: "karting, race",
    ...o,
  };
}

export function buildRaceEventDate(
  o: Partial<IRaceEventDate> = {},
): IRaceEventDate {
  return { start: "2025-06-01", end: "2025-06-04", year: 2025, ...o };
}

// ─── Circuit ──────────────────────────────────────────────────────────────────

export function buildCircuit(o: Partial<ICircuit> = {}): ICircuit {
  return {
    id: 1,
    locationName: "Kecskemét",
    length: 1122,
    latitude: 47.9495,
    longitude: 21.7444,
    country: buildCountry(),
    ...o,
  };
}

export function buildCircuitLayout(
  o: Partial<ICircuitLayout> = {},
): ICircuitLayout {
  return { id: 1, name: "Layout A", length: 1200, ...o };
}

export function buildCircuitDetail(
  o: Partial<ICircuitDetail> = {},
): ICircuitDetail {
  return {
    ...buildCircuit(),
    name: "Birizdokart",
    layout: buildCircuitLayout(),
    circuitFastestLaps: [],
    ...o,
  };
}

// ─── Fastest Lap ──────────────────────────────────────────────────────────────

export function buildFastestLap(o: Partial<IFastestLap> = {}): IFastestLap {
  return {
    category: "KZ2",
    engineType: "KZ",
    driverName: "John Doe",
    driverCountry: buildCountry(),
    lapTime: 54321,
    sessionType: "Final",
    date: "2025-06-04",
    ...o,
  };
}

// ─── Race Event ───────────────────────────────────────────────────────────────

export function buildRace(o: Partial<IRaceEvent> = {}): IRaceEvent {
  return {
    id: 1,
    slug: "test-race-2025",
    title: "Test Race 2025",
    updatedAt: "2025-01-01T00:00:00Z",
    date: buildRaceEventDate(),
    circuit: buildCircuit(),
    championships: [buildChampionship()],
    categories: { KZ: ["KZ", "KZ2"] },
    status: undefined,
    links: undefined,
    ...o,
  };
}

export function buildRaceDetail(
  o: Partial<IRaceEventDetail> = {},
): IRaceEventDetail {
  return {
    ...buildRace(),
    circuit: buildCircuitDetail(),
    fastestLaps: [],
    seoData: buildSeoData(),
    ...o,
  };
}
