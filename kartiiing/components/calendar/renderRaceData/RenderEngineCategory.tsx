import { ENGINE_COLORS, ENGINE_CATEGORIES } from "@/lib/constants/categories";
import { sortCategoriesByOrder } from "@/lib/utils";

// Types
type Props = {
  engines: string[];
  categories: string[];
  className?: string;
  showAll?: boolean;
};

type Badge = {
  label: string;
  engineType: string;
};

function addEngineCategoryBadges(
  engineName: string,
  categories: string[],
  showAll: boolean,
  badgeSet: Map<string, Badge>
) {
  if (showAll) {
    categories
      .filter((cat) => ENGINE_CATEGORIES[engineName].includes(cat))
      .forEach((cat) =>
        badgeSet.set(cat, { label: cat, engineType: engineName })
      );
  } else {
    badgeSet.set(engineName, { label: engineName, engineType: engineName });
  }
}

function getBadgesToShow(
  engines: string[],
  categories: string[],
  showAll = false
): Badge[] {
  const badgeSet = new Map<string, Badge>();

  engines.forEach((engine) => {
    if (ENGINE_CATEGORIES[engine]) {
      addEngineCategoryBadges(engine, categories, showAll, badgeSet);
    }
  });

  if (badgeSet.size === 0) {
    engines.forEach((e) => badgeSet.set(e, { label: e, engineType: e }));
  }

  return Array.from(badgeSet.values());
}

// --- Component ---
export default function RenderEngineCategory({
  engines,
  categories,
  className = "",
  showAll = false,
}: Props) {
  const badges = getBadgesToShow(engines, categories, showAll);
  const sortedBadges = sortCategoriesByOrder(badges, (badge) => badge.label);

  return (
    <div className={`flex gap-1.5 flex-wrap ${className}`}>
      {sortedBadges.map(({ label, engineType }) => (
        <span
          key={label}
          className={`text-xs px-2 py-1 rounded-md ${
            ENGINE_COLORS[engineType] ||
            "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
          }`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
