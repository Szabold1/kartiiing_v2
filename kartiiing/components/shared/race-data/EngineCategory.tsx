import { badgeBase } from "@/lib/classNames";
import { getColorsForEngine } from "@/lib/constants/categories";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  engineType: string;
  className?: string;
};

function CategoryBadge({ label, engineType, className = "" }: Props) {
  const colorClass = getColorsForEngine(engineType);

  return <span className={cn(badgeBase, colorClass, className)}>{label}</span>;
}

type RenderProps = {
  engineCategoryPairs: Record<string, string[]>;
  className?: string;
  showAll?: boolean;
  badgeClassName?: string;
};

type Badge = {
  label: string;
  engineType: string;
};

export default function EngineCategory({
  engineCategoryPairs,
  className = "",
  showAll = false,
  badgeClassName = "",
}: RenderProps) {
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
    <div className={cn("flex gap-1.5 flex-wrap", className)}>
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
