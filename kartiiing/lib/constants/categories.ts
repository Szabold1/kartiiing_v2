import {
  skyGlassBase,
  limeGlassBase,
  purpleGlassBase,
  orangeGlassBase,
  tealGlassBase,
  blueGlassBase,
  amberGlassBase,
  grayGlassBase,
} from "@/lib/classNames";

export enum EngineColorVariant {
  BASE = "base",
  HOVER = "hover",
  FULL = "full",
}

export const ENGINE_COLORS: Record<string, string> = {
  "Mini 60": `${tealGlassBase}`,
  OK: `${blueGlassBase}`,
  Academy: `${skyGlassBase}`,
  KZ: `${purpleGlassBase}`,
  Rotax: `${orangeGlassBase}`,
  IAME: `${amberGlassBase}`,
  VORTEX: `${limeGlassBase}`,
};

export const ENGINE_COLORS_HOVER: Record<string, string> = {
  "Mini 60": `hover:bg-teal-200/60 dark:hover:bg-teal-900/80 focus:bg-teal-200/70 dark:focus:bg-teal-900/80`,
  OK: `hover:bg-blue-200/55 dark:hover:bg-blue-900/70 focus:bg-blue-200/65 dark:focus:bg-blue-900/70`,
  Academy: `hover:bg-sky-200/55 dark:hover:bg-sky-900/80 focus:bg-sky-200/65 dark:focus:bg-sky-900/80`,
  KZ: `hover:bg-purple-200/60 dark:hover:bg-purple-900/70 focus:bg-purple-200/70 dark:focus:bg-purple-900/70`,
  Rotax: `hover:bg-orange-200/60 dark:hover:bg-orange-900/70 focus:bg-orange-200/70 dark:focus:bg-orange-900/70`,
  IAME: `hover:bg-amber-200/45 dark:hover:bg-amber-900/70 focus:bg-amber-200/55 dark:focus:bg-amber-900/70`,
  VORTEX: `hover:bg-lime-200/60 dark:hover:bg-lime-900/70 focus:bg-lime-200/70 dark:focus:bg-lime-900/70`,
};

export function getColorsForEngine(
  engineType: string,
  variant: EngineColorVariant = EngineColorVariant.BASE,
): string {
  switch (variant) {
    case EngineColorVariant.BASE:
      return ENGINE_COLORS[engineType] || grayGlassBase;
    case EngineColorVariant.HOVER:
      return ENGINE_COLORS_HOVER[engineType] || "";
    case EngineColorVariant.FULL:
      return (
        (ENGINE_COLORS[engineType] || grayGlassBase) +
        " " +
        (ENGINE_COLORS_HOVER[engineType] || "")
      );
    default:
      return ENGINE_COLORS[engineType] || grayGlassBase;
  }
}
