import { RaceEvent } from '../entities/raceEvent.entity';
import { Category } from '../entities/category.entity';
import { RaceEventResult } from '../entities/raceEventResult.entity';
import { RaceEventChampionship } from '../entities/raceEventChampionship.entity';
import { FastestLap } from '../entities/fastestLap.entity';
import {
  IRaceEvent,
  IRaceEventDetail,
  RaceStatus,
  IResultsLink,
  IFastestLap,
  ISeoData,
  IRaceEventMinimal,
} from '@kartiiing/shared-types';

/**
 * Convert a RaceEvent entity to an IRaceEventMinimal DTO, which includes only basic information
 */
export function toIRaceEventMinimal(entity: RaceEvent): IRaceEventMinimal {
  const sortedChampionships = sortChampionships(entity.championshipDetails);
  const title = buildRaceTitle(sortedChampionships);

  return {
    id: entity.id,
    slug: buildRaceSlug(entity, title),
    date: {
      start: entity.dateStart || '',
      end: entity.dateEnd || '',
    },
    updatedAt: entity.updatedAt.toISOString(),
  };
}

/**
 * Convert a RaceEvent entity to an IRaceEvent DTO, including optional status and result links
 */
export function toIRaceEvent(
  entity: RaceEvent,
  status?: RaceStatus | null,
): IRaceEvent {
  const sortedChampionships = sortChampionships(entity.championshipDetails);
  const title = buildRaceTitle(sortedChampionships);
  const categories = groupCategoriesByEngineType(entity.categories);

  const raceEvent: IRaceEvent = {
    id: entity.id,
    title: title,
    slug: buildRaceSlug(entity, title),
    date: {
      start: entity.dateStart || '',
      end: entity.dateEnd || '',
    },
    circuit: {
      id: entity.circuit.id,
      locationName: entity.circuit.locationName,
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
    championships: sortedChampionships,
    categories: categories,
    updatedAt: entity.updatedAt.toISOString(),
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
 * Convert a RaceEvent entity to an IRaceEventDetail DTO, including detailed circuit info, fastest laps, and SEO data
 */
export function toIRaceEventDetail(
  entity: RaceEvent,
  status?: RaceStatus | null,
): IRaceEventDetail {
  const baseEvent = toIRaceEvent(entity, status);

  // Extend circuit with detailed information
  const detailedCircuit = {
    ...baseEvent.circuit,
    name: entity.circuit.name,
    layout: {
      id: entity.circuitLayout?.id || 0,
      name: entity.circuitLayout?.name || undefined,
      length: entity.circuitLayout?.length || 0,
    },
    circuitFastestLaps: Array.isArray(entity.circuit?.fastestLaps)
      ? getFastestLapsPerCategoryPerYear(entity.circuit.fastestLaps, true)
      : undefined,
  };

  const raceEventDetail: IRaceEventDetail = {
    ...baseEvent,
    circuit: detailedCircuit,
    fastestLaps: Array.isArray(entity?.fastestLaps)
      ? getFastestLapsPerCategoryPerYear(entity.fastestLaps)
      : undefined,
    seoData: generateSeoData(entity, baseEvent.title, baseEvent.categories),
  };

  return raceEventDetail;
}

// ---------------------------------------------- //
// ----- Helpers -------------------------------- //

/**
 * Build the race event slug
 */
function buildRaceSlug(entity: RaceEvent, title: string): string {
  return generateSlug(
    `${entity.dateEnd?.slice(0, 4) || ''}-${title.replace(/#(\d+)/g, 'round-$1')}-${entity.circuit.locationName}`,
  );
}

/**
 * Build the race event title from the first championship and its round number
 */
function buildRaceTitle(championships: IRaceEvent['championships']): string {
  if (championships.length === 0) return '';
  const roundPart = championships[0].roundNumber
    ? `#${championships[0].roundNumber}`
    : '';
  return `${championships[0].name} ${roundPart}`.trim();
}

/**
 * Generate a URL-friendly slug from a string
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD') // Normalize accented characters
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate SEO data for a race event
 */
function generateSeoData(
  entity: RaceEvent,
  title: string | undefined,
  categories: Record<string, string[]>,
): ISeoData {
  const year = entity.dateEnd?.slice(0, 4) || 'Unknown Year';
  const location = entity.circuit?.locationName || 'Unknown Location';
  const date = entity.dateEnd || 'Unknown Date';
  const categoriesShort = formatCategoriesForSeo(categories);
  const categoriesLong = formatCategoriesForSeo(categories, 'long');

  // Replace # with "Round "
  const formattedTitle = title?.replace(/#(\d+)/g, 'Round $1');

  return {
    title: `${year} ${formattedTitle} - ${location} (${categoriesShort}) - Kartiiing`,
    description: `Race details for ${year} ${formattedTitle} at ${location}. Categories: ${categoriesLong}. Date: ${date}. View event information, like results, circuit details, fastest laps, and more.`,
    keywords: [
      `${year} ${formattedTitle}`,
      `${formattedTitle} ${location}`,
      location,
      categoriesShort,
      `karting race ${location}`,
    ].join(', '),
  };
}

/**
 * Format categories for SEO
 * @param categories - Categories grouped by engine type
 * @param version - 'short' returns just engine types (e.g., "KZ, Mini 60, OK")
 *                  'long' returns engine types with categories (e.g., "KZ (KZ2), Mini 60, OK (OK, OK-J, OK-NJ)")
 */
function formatCategoriesForSeo(
  categories: Record<string, string[]>,
  version: 'short' | 'long' = 'short',
): string {
  if (!categories || Object.keys(categories).length === 0) {
    return '';
  }

  if (version === 'short') {
    return Object.keys(categories).join(', ');
  }

  return Object.entries(categories)
    .map(([engineType, categoryNames]) => {
      if (categoryNames.length === 0) {
        return engineType;
      }
      const engines = categoryNames.join(', ');
      return `${engineType} (${engines})`;
    })
    .join(', ');
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
 * Gets the fastest lap per category per year, sorted by category order
 * If withTitles is true, includes the event title for each lap
 */
function getFastestLapsPerCategoryPerYear(
  fastestLaps: FastestLap[],
  withTitles = false,
): IFastestLap[] {
  const lapsByYearAndCategory = new Map<string, FastestLap>();

  for (const lap of fastestLaps || []) {
    if (!lap.category) continue;

    const year = new Date(lap.date).getFullYear();
    const key = `${lap.category.id}_${year}`;
    const existing = lapsByYearAndCategory.get(key);

    if (!existing || lap.lapTime < existing.lapTime) {
      lapsByYearAndCategory.set(key, lap);
    }
  }

  // Convert to array, sort by category order and lap time, and map to IFastestLap
  return Array.from(lapsByYearAndCategory.values())
    .sort((a, b) => {
      const categorySort =
        (a.category?.order ?? 999) - (b.category?.order ?? 999);
      if (categorySort !== 0) return categorySort;
      return a.lapTime - b.lapTime;
    })
    .map((lap) => {
      let eventTitle = '';
      if (withTitles) {
        const eventChampionships = sortChampionships(
          lap.raceEvent?.championshipDetails || [],
        );
        eventTitle = eventChampionships[0]
          ? buildRaceTitle(eventChampionships)
          : '';
      }

      return {
        category: lap.category?.name || 'Unknown',
        engineType: lap.category?.engineType || 'Unknown',
        driverName: lap.driver
          ? `${lap.driver.firstName} ${lap.driver.lastName}`.trim()
          : 'Unknown',
        driverCountry: lap.driver?.country,
        lapTime: lap.lapTime,
        sessionType: formatSessionType(lap.sessionType),
        date: lap.date,
        eventTitle: eventTitle || undefined,
      };
    });
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
