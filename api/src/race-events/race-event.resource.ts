import { RaceEvent } from '../entities/raceEvent.entity';
import { Category } from '../entities/category.entity';
import { RaceEventResult } from '../entities/raceEventResult.entity';
import { RaceEventChampionship } from '../entities/raceEventChampionship.entity';
import { FastestLap } from '../entities/fastestLap.entity';
import {
  IRaceEvent,
  RaceStatus,
  IResultsLink,
  IEventFastestLap,
} from '@kartiiing/shared-types';

export function toIRaceEvent(
  entity: RaceEvent,
  status?: RaceStatus | null,
): IRaceEvent {
  const sortedChampionships = sortChampionships(entity.championshipDetails);

  const raceEvent: IRaceEvent = {
    id: entity.id,
    title: buildRaceTitle(sortedChampionships),
    date: {
      start: entity.dateStart || '',
      end: entity.dateEnd || '',
    },
    circuit: {
      id: entity.circuit.id,
      nameShort: entity.circuit.nameShort,
      nameLong: entity.circuit.nameLong,
      length: entity.circuit.length,
      website: entity.circuit.websiteLink,
      latitude: entity.circuit.latitude,
      longitude: entity.circuit.longitude,
      country: {
        id: entity.circuit.country.id,
        name: entity.circuit.country.name,
        code: entity.circuit.country.code,
      },
      layout: {
        id: entity.circuitLayout?.id || 0,
        name: entity.circuitLayout?.name || undefined,
        length: entity.circuitLayout?.length || 0,
      },
    },
    championships: sortedChampionships,
    categories: groupCategoriesByEngineType(entity.categories),
  };

  // Add fastest laps if available
  if (Array.isArray(entity?.fastestLaps) && entity?.fastestLaps.length > 0) {
    raceEvent.fastestLaps = getFastestLapsPerCategory(entity.fastestLaps);
  }

  // Add result links if available
  if (Array.isArray(entity?.results) && entity?.results.length > 0) {
    raceEvent.links = {
      results: sortResultLinks(entity.results),
    };
  }

  // Add status if available
  if (status) {
    raceEvent.status = status;
  }

  return raceEvent;
}

/**
 * Build the race event title from the first championship and its round number
 */
function buildRaceTitle(championships: IRaceEvent['championships']): string {
  if (championships.length === 0) return '';
  const roundPart = championships[0].roundNumber
    ? ` #${championships[0].roundNumber}`
    : '';
  return `${championships[0].name} ${roundPart}`.trim();
}

/**
 * Groups categories by their engine type and sorts them.
 * E.g., { "KZ": ["KZ", "KZ2"], "OK": ["OK", "OK-J"] }
 * Categories are sorted by their order field within each engine type.
 * Engine types appear in the order they're encountered (by minimum order value).
 */
function groupCategoriesByEngineType(
  categories: Category[],
): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};

  const sortedCategories = (categories || []).sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999),
  );

  for (const category of sortedCategories) {
    const { engineType, name } = category;

    if (!grouped[engineType]) grouped[engineType] = [];
    grouped[engineType].push(name);
  }

  return grouped;
}

/**
 * Sort championships by their order field and build their titles with round numbers
 */
function sortChampionships(
  championshipDetails: RaceEventChampionship[],
): IRaceEvent['championships'] {
  return (championshipDetails || [])
    .sort(
      (a, b) => (a.championship?.order ?? 999) - (b.championship?.order ?? 999),
    )
    .map((detail) => {
      const champ = detail.championship;
      let name = champ.nameShort || champ.nameLong;

      if (champ.nameSeries) {
        name += ` ${champ.nameSeries}`;
      }

      return {
        id: champ.id,
        name,
        roundNumber: detail.roundNumber || undefined,
      };
    });
}

/**
 * Sort result links by their category's order field
 */
function sortResultLinks(
  results: RaceEventResult[] | undefined,
): IResultsLink[] {
  return (results || [])
    .sort((a, b) => (a.category?.order ?? 999) - (b.category?.order ?? 999))
    .map((result) => ({
      category: result.category?.name || 'All',
      url: result.url,
    }));
}

/**
 * Gets the fastest lap per category, sorted by category order
 */
function getFastestLapsPerCategory(
  fastestLaps: FastestLap[],
): IEventFastestLap[] {
  const lapMap = new Map<number, FastestLap>();

  for (const lap of fastestLaps || []) {
    if (lap.category) {
      const existing = lapMap.get(lap.category.id);
      if (!existing || lap.lapTime < existing.lapTime) {
        lapMap.set(lap.category.id, lap);
      }
    }
  }

  // Convert to array and sort by category order
  return Array.from(lapMap.values())
    .sort((a, b) => (a.category?.order ?? 999) - (b.category?.order ?? 999))
    .map((lap) => ({
      category: lap.category?.name || 'Unknown',
      engineType: lap.category?.engineType || 'Unknown',
      driverName: lap.driver
        ? `${lap.driver.firstName} ${lap.driver.lastName}`.trim()
        : 'Unknown',
      lapTime: lap.lapTime,
      sessionType: formatSessionType(lap.sessionType),
      date: lap.date,
    }));
}

/**
 * Convert session type constant to readable format
 * E.g., "WARM_UP" -> "Warm Up", "PRACTICE" -> "Practice"
 */
function formatSessionType(sessionType: string): string {
  if (!sessionType) return 'Unknown';
  return sessionType
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
