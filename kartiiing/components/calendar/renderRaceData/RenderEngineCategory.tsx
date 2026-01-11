import CategoryBadge from "@/components/calendar/CategoryBadge";

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
        <CategoryBadge
          key={`${engineType}-${label}`}
          label={label}
          engineType={engineType}
          className={badgeClassName}
        />
      ))}
    </div>
  );
}
