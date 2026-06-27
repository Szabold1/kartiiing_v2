import { cn, getColorsForEngine } from "@/lib/utils";
import { Badge } from "@/components/shared/badges/Badge";

type Props = {
  label: string;
  engineType: string;
  className?: string;
};

export function CategoryBadge({
  label,
  engineType,
  className = "",
}: Props) {
  const colorClass = getColorsForEngine(engineType);

  return <Badge className={cn(colorClass, className)}>{label}</Badge>;
}
