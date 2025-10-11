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

export interface ICircuit {
  id: number;
  nameShort: string;
  nameLong: string;
  length: number;
  website?: string;
  latitude: number;
  longitude: number;
  country: ICountry;
}

export interface IChampionship {
  id: number;
  nameShort: string;
  nameLong: string;
  nameSeries: string;
}

export enum RaceStatus {
  LIVE = 'Live',
  UPNEXT = 'Up Next',
  FINISHED = 'Finished',
}

export interface IResultsLink {
  name: string;
  url: string;
}

export interface IRaceEvent {
  id: number;
  roundNumber?: number;
  date: IRaceEventDate;
  circuit: ICircuit;
  championship: IChampionship;
  categories: Record<string, string[]>;
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