import { badgeBase } from "@/lib/classNames";
import { getColorStylesForEngineCategory } from "@/lib/constants/categories";

type Props = {
  label: string;
  engineType: string;
  className?: string;
};

export default function CategoryBadge({
  label,
  engineType,
  className = "",
}: Props) {
  const colorClass = getColorStylesForEngineCategory(engineType);

  return (
    <span className={`${badgeBase} ${colorClass} ${className}`}>{label}</span>
  );
}
