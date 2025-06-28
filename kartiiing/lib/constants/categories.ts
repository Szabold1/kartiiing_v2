export const ENGINE_COLORS: Record<string, string> = {
  "Mini 60": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
  OK: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
  Academy: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
  KZ: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  Rotax: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
  IAME: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Vortex:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
};

export const ENGINE_CATEGORIES: Record<string, string[]> = {
  Rotax: ["Micro", "Mini", "Junior", "Senior", "DD2", "DD2-Masters"],
  IAME: ["X30 Mini", "X30 Junior", "X30 Senior"],
  Vortex: ["Rok Mini", "Rok Junior", "Rok Senior", "Rok Super", "Rok Expert", "Rok Shifter"],
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
