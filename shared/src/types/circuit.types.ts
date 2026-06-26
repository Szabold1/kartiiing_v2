import { ICountry } from "./country.types";
import { IFastestLap } from "./fastest-lap.types";

export interface ICircuitLayout {
  id: number;
  name?: string;
  length: number;
  current?: boolean;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface ICircuit {
  id: number;
  name: string;
  locationName: string;
  length: number;
  website?: string;
  coordinates: ICoordinates;
  country: ICountry;
  layouts?: ICircuitLayout[];
}

export interface ICircuitDetail extends ICircuit {
  circuitFastestLaps?: IFastestLap[];
}

export interface ICircuitCoordinate {
  id: number;
  coordinates: ICoordinates;
}
