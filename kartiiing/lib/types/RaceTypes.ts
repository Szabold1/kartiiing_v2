export type Date = {
  start: string;
  end: string;
};

export type Location = {
  name: string;
  country: {
    name: string;
    code: string;
  };
  circuit: {
    name: string;
    id: number;
  };
};

export type Championship = {
  base_name: string;
  short_name: string | null;
  series_name: string | null;
  engine_types: string[];
  categories: string[];
  round_number?: number;
};

type ResultLink = {
  url: string;
  category: string;
};

type LiveLink = {
  url: string;
  type: "stream" | "time";
};

export type RaceEvent = {
  id: number;
  date: Date;
  location: Location;
  championships: Championship[];
  results_links: ResultLink[] | null;
  live_links: LiveLink[] | null;
};

export type RaceCardData = {
  id: string;
  date: Date;
  location: Location;
  championship: Championship;
};
