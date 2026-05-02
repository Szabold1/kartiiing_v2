import { ICountry } from "./country.types";
import { IFastestLap } from "./fastest-lap.types";

export interface ICircuitLayout {
  id: number;
  name?: string;
  length: number;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface ICircuit {
  id: number;
  locationName: string;
  length: number;
  website?: string;
  coordinates: ICoordinates;
  country: ICountry;
}

export interface ICircuitDetail extends ICircuit {
  name: string;
  layout: ICircuitLayout;
  circuitFastestLaps?: IFastestLap[];
}