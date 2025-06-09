import { ENGINE_COLORS, CATEGORY_ORDER } from "@/lib/constants/categories";

// Types
type Props = {
  engines: string[];
  categories: string[];
  className?: string;
};

type Badge = {
  label: string;
  engineType: string;
};

// --- Badge logic helpers ---
function mergeCategories(engine: string, categories: string[]): Badge[] {
  const badges: Badge[] = [];
  const has = (c: string) => categories.includes(c);

  if (engine === "OK") {
    if (has("OK") && has("OK-J"))
      badges.push({ label: "OK/J", engineType: "OK" });
    else {
      if (has("OK")) badges.push({ label: "OK", engineType: "OK" });
      if (has("OK-J")) badges.push({ label: "OK-J", engineType: "OK" });
    }
  } else if (engine === "OK-N") {
    if (has("OK-N") && has("OK-NJ"))
      badges.push({ label: "OK-N/J", engineType: "OK" });
    else {
      if (has("OK-N")) badges.push({ label: "OK-N", engineType: "OK" });
      if (has("OK-NJ")) badges.push({ label: "OK-NJ", engineType: "OK" });
    }
  }

  return badges;
}

function getBadgesToShow(engines: string[], categories: string[]): Badge[] {
  const badgeSet = new Map<string, Badge>();

  if (engines.includes("Mini 60")) {
    categories
      .filter((cat) => cat.includes("Mini 60"))
      .forEach((cat) =>
        badgeSet.set(cat, { label: cat, engineType: "Mini 60" })
      );
  }

  if (engines.includes("KZ")) {
    categories
      .filter((cat) => cat.includes("KZ"))
      .forEach((cat) => badgeSet.set(cat, { label: cat, engineType: "KZ" }));
  }

  if (engines.includes("OK")) {
    mergeCategories("OK", categories).forEach((b) => badgeSet.set(b.label, b));
    mergeCategories("OK-N", categories).forEach((b) =>
      badgeSet.set(b.label, b)
    );
  }

  if (engines.includes("Rotax")) {
    badgeSet.set("Rotax", { label: "Rotax", engineType: "Rotax" });
  }

  if (engines.includes("IAME")) {
    if (badgeSet.size === 0 && categories.length <= 3) {
      categories.forEach((cat) =>
        badgeSet.set(cat, { label: cat, engineType: "IAME" })
      );
    } else {
      badgeSet.set("IAME", { label: "IAME", engineType: "IAME" });
    }
  }

  categories
    .filter((cat) => cat.includes("Academy"))
    .forEach((cat) => badgeSet.set(cat, { label: cat, engineType: "Academy" }));

  if (badgeSet.size === 0) {
    engines.forEach((e) => badgeSet.set(e, { label: e, engineType: e }));
  }

  return Array.from(badgeSet.values());
}

// --- Component ---
export default function EngineCategoryDisplay({
  engines,
  categories,
  className = "",
}: Props) {
  const badges = getBadgesToShow(engines, categories);

  return (
    <div className={`flex gap-1.5 flex-wrap ${className}`}>
      {badges
        .sort((a, b) => {
          const ai = CATEGORY_ORDER.indexOf(a.label);
          const bi = CATEGORY_ORDER.indexOf(b.label);
          return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        })
        .map(({ label, engineType }) => (
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
