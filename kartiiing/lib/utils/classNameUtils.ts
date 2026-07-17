import { EngineColorVariant } from '@/lib/constants/categories';

// ---------------------------------------------------------------------- //
// --- No-border hover styles (bg + text hover for child elements ------- //
// --- inside already-colored parent containers, e.g. dropdown items) --- //

export const tealNoBorderHover = `
  hover:bg-teal-200 hover:text-teal-800 dark:hover:bg-teal-900 dark:hover:text-teal-200
  focus:bg-teal-200 focus:text-teal-800 dark:focus:bg-teal-900 dark:focus:text-teal-200
`;
export const blueNoBorderHover = `
  hover:bg-blue-200 hover:text-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-200
  focus:bg-blue-200 focus:text-blue-800 dark:focus:bg-blue-900 dark:focus:text-blue-200
`;
export const skyNoBorderHover = `
  hover:bg-sky-200 hover:text-sky-800 dark:hover:bg-sky-900 dark:hover:text-sky-200
  focus:bg-sky-200 focus:text-sky-800 dark:focus:bg-sky-900 dark:focus:text-sky-200
`;
export const purpleNoBorderHover = `
  hover:bg-purple-200 hover:text-purple-800 dark:hover:bg-purple-900 dark:hover:text-purple-200
  focus:bg-purple-200 focus:text-purple-800 dark:focus:bg-purple-900 dark:focus:text-purple-200
`;
export const orangeNoBorderHover = `
  hover:bg-orange-200 hover:text-orange-800 dark:hover:bg-orange-900 dark:hover:text-orange-200
  focus:bg-orange-200 focus:text-orange-800 dark:focus:bg-orange-900 dark:focus:text-orange-200
`;
export const amberNoBorderHover = `
  hover:bg-amber-200 hover:text-amber-800 dark:hover:bg-amber-900 dark:hover:text-amber-200
  focus:bg-amber-200 focus:text-amber-800 dark:focus:bg-amber-900 dark:focus:text-amber-200
`;
export const limeNoBorderHover = `
  hover:bg-lime-200 hover:text-lime-800 dark:hover:bg-lime-900 dark:hover:text-lime-200
  focus:bg-lime-200 focus:text-lime-800 dark:focus:bg-lime-900 dark:focus:text-lime-200
`;
export const grayNoBorderHover = `
  hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-700 dark:hover:text-gray-200
  focus:bg-gray-100 focus:text-gray-800 dark:focus:bg-gray-700 dark:focus:text-gray-200
`;
export const redNoBorderHover = `
  hover:bg-red-200 hover:text-red-800 dark:hover:bg-red-900 dark:hover:text-red-200
  focus:bg-red-200 focus:text-red-800 dark:focus:bg-red-900 dark:focus:text-red-200
`;
export const greenNoBorderHover = `
  hover:bg-green-200 hover:text-green-800 dark:hover:bg-green-900 dark:hover:text-green-200
  focus:bg-green-200 focus:text-green-800 dark:focus:bg-green-900 dark:focus:text-green-200
`;
export const cyanNoBorderHover = `
  hover:bg-cyan-200 hover:text-cyan-800 dark:hover:bg-cyan-900 dark:hover:text-cyan-200
  focus:bg-cyan-200 focus:text-cyan-800 dark:focus:bg-cyan-900 dark:focus:text-cyan-200
`;
export const emeraldNoBorderHover = `
  hover:bg-emerald-200 hover:text-emerald-800 dark:hover:bg-emerald-900 dark:hover:text-emerald-200
  focus:bg-emerald-200 focus:text-emerald-800 dark:focus:bg-emerald-900 dark:focus:text-emerald-200
`;
export const pinkNoBorderHover = `
  hover:bg-pink-200 hover:text-pink-800 dark:hover:bg-pink-900 dark:hover:text-pink-200
  focus:bg-pink-200 focus:text-pink-800 dark:focus:bg-pink-900 dark:focus:text-pink-200
`;
export const violetNoBorderHover = `
  hover:bg-violet-200 hover:text-violet-800 dark:hover:bg-violet-900 dark:hover:text-violet-200
  focus:bg-violet-200 focus:text-violet-800 dark:focus:bg-violet-900 dark:focus:text-violet-200
`;

// ---------------------------------------------- //
// ----- Glass base styles ---------------------- //

export const glassBase = 'border shadow-2xs backdrop-blur-md';

export const redGlassBase = `
  ${glassBase} 
  border-red-600/35 text-red-700 bg-red-100 
  dark:border-red-600/45 dark:text-red-400 dark:bg-red-900/55
`;

export const lightDarkGlassBase = `
  ${glassBase} 
  border-gray-600/20 bg-accent/20 
  dark:border-gray-50/10
`;

export const lightDarkGlassActive = `
  ${lightDarkGlassBase} transition 
  border-gray-600/45 
  dark:border-gray-50/25
`;

export const grayGlassBase = `
  ${glassBase} 
  border-gray-600/25 text-gray-700 bg-gray-200/60 
  dark:border-gray-600/50 dark:text-gray-400 dark:bg-gray-800/60
`;

export const tealGlassBase = `
  ${glassBase} 
  border-teal-600/35 text-teal-700 bg-teal-100 
  dark:border-teal-600/45 dark:text-teal-400 dark:bg-teal-900/50
`;

export const cyanGlassBase = `
  ${glassBase} 
  border-cyan-600/35 text-cyan-700 bg-cyan-100
  dark:border-cyan-600/45 dark:text-cyan-400 dark:bg-cyan-900/50
`;

export const skyGlassBase = `
  ${glassBase} 
  border-sky-600/35 text-sky-700 bg-sky-100
  dark:border-sky-600/45 dark:text-sky-400 dark:bg-sky-900/50
`;

export const blueGlassBase = `
  ${glassBase} 
  border-blue-600/35 text-blue-700 bg-blue-100 
  dark:border-blue-600/45 dark:text-blue-400 dark:bg-blue-900/50
`;

export const limeGlassBase = `
  ${glassBase} 
  border-lime-600/35 text-lime-700 bg-lime-100
  dark:border-lime-600/45 dark:text-lime-400 dark:bg-lime-900/50
`;

export const greenGlassBase = `
  ${glassBase} 
  border-green-600/35 text-green-700 bg-green-100 
  dark:border-green-600/45 dark:text-green-400 dark:bg-green-900/60
`;

export const emeraldGlassBase = `
  ${glassBase} 
  border-emerald-600/35 text-emerald-700 bg-emerald-100
  dark:border-emerald-600/45 dark:text-emerald-400 dark:bg-emerald-900/50`;

export const orangeGlassBase = `
  ${glassBase} 
  border-orange-600/35 text-orange-700 bg-orange-100 
  dark:border-orange-600/45 dark:text-orange-400 dark:bg-orange-900/50
`;

export const purpleGlassBase = `
  ${glassBase} 
  border-purple-600/35 text-purple-700 bg-purple-100 
  dark:border-purple-600/45 dark:text-purple-400 dark:bg-purple-900/50
`;

export const pinkGlassBase = `
  ${glassBase} 
  border-pink-600/35 text-pink-700 bg-pink-100
  dark:border-pink-600/45 dark:text-pink-400 dark:bg-pink-900/50
`;

export const amberGlassBase = `
  ${glassBase} 
  border-amber-600/35 text-amber-700 bg-amber-100 
  dark:border-amber-600/45 dark:text-amber-400 dark:bg-amber-900/50
`;

export const violetGlassBase = `
  ${glassBase} 
  border-violet-600/35 text-violet-700 bg-violet-100 
  dark:border-violet-600/45 dark:text-violet-400 dark:bg-violet-900/50
`;

export const liveContainerBase = `
  border-red-600/35 bg-red-100/50 
  dark:border-red-900/70 dark:bg-red-900/25
`;

// ---------------------------------------------- //

export const badgeBase = `
  text-xs px-2 py-1.5 rounded-lg uppercase font-semibold flex items-center justify-center
`;

export const noBlurGlassBase = `
  border shadow-2xs border-gray-200 dark:border-gray-700 bg-accent dark:bg-accent
`;

export const flagIconBase = `
  max-w-5 h-3.5 rounded-[0.15rem] object-cover shadow
`;

export const navLinkActive = `
  text-green-700 dark:text-green-500
`;

// ---------------------------------------------- //
// ----- Glass hover styles ---------------------- //

export const redGlassHover = `
  ${redGlassBase} ${redNoBorderHover}
`;

export const lightDarkGlassOnlyHover = `
  hover:shadow transition 
  hover:border-gray-600/55 hover:bg-accent/55 
  hover:dark:border-gray-50/35
`;

export const lightDarkGlassHover = `
  ${lightDarkGlassBase} ${lightDarkGlassOnlyHover}
`;

export const grayGlassHover = `
  ${grayGlassBase} ${grayNoBorderHover}
`;

export const greenGlassHover = `
  ${greenGlassBase} ${greenNoBorderHover}
`;

export const liveContainerHover = `
  ${liveContainerBase} 
  hover:border-red-600/80 hover:bg-red-100/70 
  hover:dark:border-red-900 hover:dark:bg-red-900/35
`;

// ---------------------------------------------- //
// ----- Engine and category related colors ----- //

/**
 * Registry of all available color styles. Maps a color name to its
 * base glass style and input hover (subtle bg-only hover for
 * dropdown items inside already-colored parent containers).
 */
export const GLASS_REGISTRY: Record<
  string,
  { base: string; noBorderHover: string }
> = {
  teal: {
    base: tealGlassBase,
    noBorderHover: tealNoBorderHover,
  },
  blue: {
    base: blueGlassBase,
    noBorderHover: blueNoBorderHover,
  },
  sky: {
    base: skyGlassBase,
    noBorderHover: skyNoBorderHover,
  },
  purple: {
    base: purpleGlassBase,
    noBorderHover: purpleNoBorderHover,
  },
  orange: {
    base: orangeGlassBase,
    noBorderHover: orangeNoBorderHover,
  },
  amber: {
    base: amberGlassBase,
    noBorderHover: amberNoBorderHover,
  },
  lime: {
    base: limeGlassBase,
    noBorderHover: limeNoBorderHover,
  },
  gray: {
    base: grayGlassBase,
    noBorderHover: grayNoBorderHover,
  },
  red: {
    base: redGlassBase,
    noBorderHover: redNoBorderHover,
  },
  green: {
    base: greenGlassBase,
    noBorderHover: greenNoBorderHover,
  },
  cyan: {
    base: cyanGlassBase,
    noBorderHover: cyanNoBorderHover,
  },
  emerald: {
    base: emeraldGlassBase,
    noBorderHover: emeraldNoBorderHover,
  },
  pink: {
    base: pinkGlassBase,
    noBorderHover: pinkNoBorderHover,
  },
  violet: {
    base: violetGlassBase,
    noBorderHover: violetNoBorderHover,
  },
};

/**
 * Default color-to-engine mapping. Each engine category is assigned
 * a color name from {@link GLASS_REGISTRY}. Users can override these
 * via {@link getColorsForEngine}'s {@link overrideColor} parameter.
 */
export const ENGINE_DEFAULT_COLORS: Record<string, string> = {
  'MINI 60': 'teal',
  OK: 'blue',
  ACADEMY: 'sky',
  KZ: 'purple',
  ROTAX: 'orange',
  IAME: 'amber',
  VORTEX: 'lime',
};

export function getColorsForEngine(
  engineType: string,
  variant: EngineColorVariant = EngineColorVariant.BASE,
  overrideColor?: string,
): string {
  const normalizedEngine = engineType.toUpperCase();
  const colorName =
    overrideColor || ENGINE_DEFAULT_COLORS[normalizedEngine] || 'gray';
  const { base, noBorderHover } =
    GLASS_REGISTRY[colorName] || GLASS_REGISTRY.gray;

  switch (variant) {
    case EngineColorVariant.BASE:
      return base;
    case EngineColorVariant.HOVER:
      return noBorderHover;
    case EngineColorVariant.FULL:
      return `${base} ${noBorderHover}`;
    default:
      return base;
  }
}

// ---------------------------------------------- //
// ----- Grid/List view layout utilities -------- //

export const listViewContainerClasses = `${lightDarkGlassBase} flex flex-col p-1.5 rounded-[1.3rem] dark:bg-neutral-900`;

export const gridViewContainerBase =
  'grid justify-center gap-5 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(16.9rem,1fr))]';

export function getGridWidthClass(itemCount: number): string {
  switch (itemCount) {
    case 1:
      return 'max-w-[22rem]';
    case 2:
      return 'max-w-[calc(2*22rem_+_1.25rem)]';
    default:
      return 'max-w-full';
  }
}

// ---------------------------------------------- //
