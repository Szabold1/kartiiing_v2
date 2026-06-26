import { ICircuit, ICircuitCoordinate } from '@kartiiing/shared';
import { Circuit } from '../entities/circuit.entity';

/**
 * Maps a Circuit entity to the ICircuit DTO.
 */
export function toICircuit(entity: Circuit): ICircuit {
  return {
    id: entity.id,
    name: entity.name,
    locationName: entity.locationName,
    length: entity.length,
    website: entity.websiteLink,
    coordinates: {
      latitude: Number(entity.latitude),
      longitude: Number(entity.longitude),
    },
    country: {
      id: entity.country.id,
      name: entity.country.name,
      code: entity.country.code,
    },
    layouts: (entity.layouts || []).map((l) => ({
      id: l.id,
      name: l.name || undefined,
      length: l.length,
    })),
  };
}

/**
 * Maps a Circuit entity to the minimal ICircuitCoordinate DTO (for map markers).
 */
export function toICircuitCoordinate(entity: Circuit): ICircuitCoordinate {
  return {
    id: entity.id,
    coordinates: {
      latitude: Number(entity.latitude),
      longitude: Number(entity.longitude),
    },
  };
}
