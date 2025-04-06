import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatRaceData = (rawRaces: any[]) => {
  return rawRaces.map(
    ({ location_name, country_name, country_code, ...rest }) => ({
      ...rest,
      location: {
        name: location_name,
        country: {
          name: country_name,
          code: country_code,
        },
      },
    })
  );
};
