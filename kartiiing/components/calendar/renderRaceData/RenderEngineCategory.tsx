import { ENGINE_COLORS } from "@/lib/constants/categories";

type Props = {
  engineCategoryPairs: Record<string, string[]>;
  className?: string;
  showAll?: boolean;
  badgeClassName?: string;
};

type Badge = {
  label: string;
  engineType: string;
};

export default function RenderEngineCategory({
  engineCategoryPairs,
  className = "",
  showAll = false,
  badgeClassName = "",
}: Props) {
  const badges: Badge[] = [];

  Object.entries(engineCategoryPairs).forEach(([engineType, categories]) => {
    if (showAll) {
      categories.forEach((cat) => {
        badges.push({ label: cat, engineType });
      });
    } else {
      badges.push({ label: engineType, engineType });
    }
  });

  return (
    <div className={`flex gap-1.5 flex-wrap ${className}`}>
      {badges.map(({ label, engineType }) => (
        <span
          key={`${engineType}-${label}`}
          className={`text-xs px-2 py-1.5 rounded-md uppercase font-medium ${
            ENGINE_COLORS[engineType] ||
            "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200"
          } ${badgeClassName}`}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
