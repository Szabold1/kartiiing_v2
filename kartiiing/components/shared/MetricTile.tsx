import type { ReactNode } from "react";
import { cn, grayGlassBase } from "@/lib/utils";

type Props = {
  icon: ReactNode;
  value: ReactNode;
  title?: string;
  className?: string;
  show?: boolean;
};

export default function MetricTile({
  icon,
  value,
  title,
  className = "",
  show = true,
}: Props) {
  if (!show) return null;
  return (
    <div
      title={title}
      className={cn(
        "rounded-lg py-1.5 px-2 flex items-center justify-center gap-1.5 min-w-max flex-1 whitespace-nowrap",
        grayGlassBase,
        className,
      )}
    >
      <div aria-hidden="true" className="shrink-0">
        {icon}
      </div>
      <p className="text-xs font-semibold">{value}</p>
    </div>
  );
}
