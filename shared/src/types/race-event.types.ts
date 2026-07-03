import { ICircuit, ICircuitDetail } from "./circuit.types";
import { IFastestLap } from "./fastest-lap.types";
import { ISeoData } from "./seo.types";
import { IWeatherDataDay } from "./weather.types";

export interface IRaceEventDateMinimal {
  start: string;
  end: string;
}

export interface IRaceEventDate extends IRaceEventDateMinimal {
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

export enum CalendarOrderPreset {
  ALL_ASC = "all_asc",
  ALL_DESC = "all_desc",
  UPCOMING = "upcoming",
  FINISHED = "finished",
}

export interface IRaceEventDetail extends IRaceEvent {
  circuit: ICircuitDetail;
  fastestLaps?: IFastestLap[];
  weatherByDays?: IWeatherDataDay[];
  seoData: ISeoData;
}
