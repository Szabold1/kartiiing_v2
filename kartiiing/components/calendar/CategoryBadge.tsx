import { badgeBase } from "@/lib/classNames";
import { getColorsForEngine } from "@/lib/constants/categories";

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
  const colorClass = getColorsForEngine(engineType);

  return (
    <span className={`${badgeBase} ${colorClass} ${className}`}>{label}</span>
  );
}
