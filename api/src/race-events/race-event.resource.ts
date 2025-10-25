import { RaceEvent } from '../entities/raceEvent.entity';
import { Category } from '../entities/category.entity';
import { RaceEventResult } from '../entities/raceEventResult.entity';
import { IRaceEvent, RaceStatus, IResultsLink } from '@kartiiing/shared-types';
import { Championship } from 'src/entities/championship.entity';

export function toIRaceEvent(
  entity: RaceEvent,
  status?: RaceStatus | null,
): IRaceEvent {
  const raceEvent: IRaceEvent = {
    id: entity.id,
    roundNumber: entity.roundNumber,
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
    },
    championships: sortChampionships(entity.championships),
    categories: groupCategoriesByEngineType(entity.categories),
  };

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
 * Sort championships by their order field
 */
function sortChampionships(
  championships: Championship[],
): IRaceEvent['championships'] {
  return (championships || [])
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map((champ) => ({
      id: champ.id,
      nameShort: champ.nameShort,
      nameLong: champ.nameLong,
      nameSeries: champ.nameSeries,
      order: champ.order,
    }));
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
