import { grayGlassBase, redGlassBase } from "@/lib/classNames";

type Props = {
  status: "Live" | "Upcoming" | "Finished";
  className?: string;
};

export default function StatusBadge({ status, className = "" }: Props) {
  if (!status) return null;

  const baseClasses =
    "relative text-xs tracking-wider uppercase overflow-hidden ";

  const colorClasses = {
    Live: `${redGlassBase} `,
    Upcoming: `${redGlassBase} `,
    Finished: `${grayGlassBase} `,
  };

  return <span className={baseClasses + colorClasses[status] + className}>{status}</span>;
}
