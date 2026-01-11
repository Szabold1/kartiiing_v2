import {
  skyGlassBase,
  limeGlassBase,
  purpleGlassBase,
  orangeGlassBase,
  tealGlassBase,
  blueGlassBase,
  amberGlassBase,
  slateGlassBase,
} from "@/lib/classNames";

export const ENGINE_COLORS: Record<string, string> = {
  "Mini 60": `${tealGlassBase}`,
  OK: `${blueGlassBase}`,
  Academy: `${skyGlassBase}`,
  KZ: `${purpleGlassBase}`,
  Rotax: `${orangeGlassBase}`,
  IAME: `${amberGlassBase}`,
  Vortex: `${limeGlassBase}`,
};

export function getColorStylesForEngineCategory(engineType: string): string {
  return ENGINE_COLORS[engineType] || slateGlassBase;
}
