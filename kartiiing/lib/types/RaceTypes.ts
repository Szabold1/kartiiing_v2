type LiveLink = {
    type: "stream" | "time";
    url: string;
}

type ResultLink = {
    category: string;
    url: string;
}

export interface RawRace {
    id: number;
    start_date: string; // YYYY-MM-DD format
    end_date: string; // YYYY-MM-DD format
    categories: string[];
    engine_types: string[];
    championships: string[];
    live_links?: LiveLink[] | null;
    results_links?: ResultLink[] | null;
    location_name: string;
    country_name: string;
    country_code: string;
  }

export interface Race {
    id: number;
    start_date: string; // YYYY-MM-DD format
    end_date: string; // YYYY-MM-DD format
    categories: string[];
    engine_types: string[];
    championships: string[];
    live_links?: LiveLink[] | null;
    results_links?: ResultLink[] | null;
    location: {
      name: string;
      country: {
        name: string;
        code: string;
      };
    };
  }