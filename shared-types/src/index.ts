export * from './country.types';
export * from './circuit.types';
export * from './fastest-lap.types';
export * from './race-event.types';
export * from './pagination.types';

export interface IYearStats {
    year: number;
    races: number;
    circuits: number;
    championships: number;
}