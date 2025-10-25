import { grayGlassBase, redGlassBase } from "@/lib/classNames";
import { RaceStatus } from "@kartiiing/shared-types";

type Props = {
  status: RaceStatus;
  className?: string;
};

export default function StatusBadge({ status, className = "" }: Props) {
  if (!status) return null;

  const baseClasses =
    "relative text-xs tracking-wider uppercase overflow-hidden ";

  const colorClasses = {
  [RaceStatus.LIVE]: `${redGlassBase} `,
  [RaceStatus.UPNEXT]: `${redGlassBase} `,
  [RaceStatus.FINISHED]: `${grayGlassBase} `,
  };

  return <span className={baseClasses + colorClasses[status] + className}>{status}</span>;
}
