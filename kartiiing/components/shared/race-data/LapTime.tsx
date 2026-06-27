import { cn, formatLapTime } from "@/lib/utils";

type Props = {
  time: number;
  className?: string;
};

export function LapTime({ time, className }: Props) {
  return (
    <span className={cn("font-mono font-semibold text-lg", className)}>
      {formatLapTime(time)}
    </span>
  );
}
