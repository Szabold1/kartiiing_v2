import { ICountry } from "./country.types";
import { IFastestLap } from "./fastest-lap.types";

export interface ICircuitLayout {
  id: number;
  name?: string;
  length: number;
}

export interface ICircuit {
  id: number;
  nameShort: string;
  length: number;
  website?: string;
  latitude: number;
  longitude: number;
  country: ICountry;
}

export interface ICircuitDetail extends ICircuit {
  nameLong: string;
  layout: ICircuitLayout;
  circuitFastestLaps?: IFastestLap[];
}