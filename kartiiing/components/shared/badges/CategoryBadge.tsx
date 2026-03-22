import { cn, badgeBase, getColorsForEngine } from "@/lib/utils";

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

  return <span className={cn(badgeBase, colorClass, className)}>{label}</span>;
}
