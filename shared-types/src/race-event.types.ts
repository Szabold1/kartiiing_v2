import { ICircuit, ICircuitDetail } from "./circuit.types";
import { IFastestLap } from "./fastest-lap.types";
import { ISeoData } from "./seo.types";

export enum RaceEventSortOptions {
  ASC = "asc",
  DESC = "desc",
}

export interface IRaceEventDate {
  start?: string;
  end?: string;
  year?: number;
}

export interface IChampionship {
  id: number;
  name: string;
  roundNumber?: number;
}

export enum RaceStatus {
  LIVE = "Live",
  UPNEXT = "Up Next",
  UPCOMING = "Upcoming",
  FINISHED = "Finished",
}

export interface IResultsLink {
  category: string;
  url: string;
}

export interface IRaceEventMinimal {
  id: number;
  slug: string;
  date: IRaceEventDate;
  updatedAt: string;
}

export interface IRaceEvent extends IRaceEventMinimal {
  title: string;
  circuit: ICircuit;
  championships: IChampionship[];
  categories: Record<string, string[]>;
  status?: RaceStatus;
  links?: {
    results?: IResultsLink[];
  };
}

export interface IRaceEventDetail extends IRaceEvent {
  circuit: ICircuitDetail;
  fastestLaps?: IFastestLap[];
  seoData: ISeoData;
}
