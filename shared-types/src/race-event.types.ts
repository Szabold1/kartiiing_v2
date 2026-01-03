export enum RaceEventSortOptions {
  ASC = "asc",
  DESC = "desc",
}

export interface IRaceEventDate {
  start: string;
  end: string;
}

export interface ICountry {
  id: number;
  name: string;
  code: string;
}

export interface ICircuitLayout {
  id: number;
  name?: string;
  length: number;
}

export interface ICircuit {
  id: number;
  nameShort: string;
  nameLong: string;
  length: number;
  website?: string;
  latitude: number;
  longitude: number;
  country: ICountry;
  layout: ICircuitLayout;
}

export interface IChampionship {
  id: number;
  name: string;
  roundNumber?: number;
}

export enum RaceStatus {
  LIVE = 'Live',
  UPNEXT = 'Up Next',
  UPCOMING = 'Upcoming',
  FINISHED = 'Finished',
}

export interface IResultsLink {
  category: string;
  url: string;
}

export interface IEventFastestLap {
  category: string;
  driverName: string;
  lapTime: number;
  sessionType: string;
  date: string;
}

export interface IRaceEvent {
  id: number;
  title?: string;
  date: IRaceEventDate;
  circuit: ICircuit;
  championships: IChampionship[];
  categories: Record<string, string[]>;
  fastestLaps?: IEventFastestLap[];
  status?: RaceStatus;
  links?: {
    results?: IResultsLink[];
  }
}

export interface IPaginationMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface IPaginatedResponse<T> {
  data: T[];
  meta: IPaginationMeta;
}