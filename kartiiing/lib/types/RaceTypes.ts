import { LiveLinkType } from "../generated/prisma";

export type RaceDate = {
  start: Date | null;
  end: Date;
};

export type Location = {
  country: {
    name: string;
    code: string;
  };
  circuit: {
    name: string;
    nameLong: string;
    id: number;
  };
};

export type Championship = {
  name: string;
  nameLong: string | null;
  nameSeries: string | null;
  engineTypes: string[];
  categories: string[];
  roundNumber?: number;
};

export type RaceEventGrouped = {
  id: string;
  date: RaceDate;
  location: Location;
  championship: Championship;
  resultsLinks?: { url: string; category: string }[] | null;
  liveLinks?: { url: string; type: LiveLinkType }[] | null;
};
