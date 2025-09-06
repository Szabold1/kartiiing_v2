import {
  cyanGlassBase,
  skyGlassBase,
  limeGlassBase,
  emeraldGlassBase,
  yellowGlassBase,
  purpleGlassBase,
  orangeGlassBase,
} from "@/lib/classNames";

export const ENGINE_COLORS: Record<string, string> = {
  "Mini 60": `${emeraldGlassBase}`,
  OK: `${skyGlassBase}`,
  Academy: `${cyanGlassBase}`,
  KZ: `${purpleGlassBase}`,
  Rotax: `${orangeGlassBase}`,
  IAME: `${yellowGlassBase}`,
  Vortex: `${limeGlassBase}`,
};

export const ENGINE_CATEGORIES: Record<string, string[]> = {
  Rotax: ["Micro", "Mini", "Junior", "Senior", "DD2", "DD2-Masters"],
  IAME: ["X30 Mini", "X30 Junior", "X30 Senior"],
  Vortex: [
    "Rok Mini",
    "Rok Junior",
    "Rok Senior",
    "Rok Super",
    "Rok Expert",
    "Rok Shifter",
  ],
  "Mini 60": ["Mini 60"],
  OK: ["OK", "OK-J", "OK-N", "OK-NJ", "OK/J", "OK-N/J"],
  KZ: ["KZ", "KZ2", "KZ2-Masters"],
  Academy: ["Academy-Junior", "Academy-Senior"],
};

export const CATEGORY_ORDER = [
  ...ENGINE_CATEGORIES["Rotax"],
  ...ENGINE_CATEGORIES["IAME"],
  ...ENGINE_CATEGORIES["Vortex"],
  ...ENGINE_CATEGORIES["Mini 60"],
  ...ENGINE_CATEGORIES["OK"],
  ...ENGINE_CATEGORIES["KZ"],
  ...ENGINE_CATEGORIES["Academy"],
];
