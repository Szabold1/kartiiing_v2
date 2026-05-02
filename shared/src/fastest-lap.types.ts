import { ICountry } from "./country.types";

export interface IFastestLap {
  category: string;
  engineType: string;
  driverName: string;
  driverCountry?: ICountry;
  lapTime: number;
  sessionType: string;
  date: string;
  eventTitle?: string;
}