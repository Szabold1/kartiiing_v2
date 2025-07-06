type Props = {
  status: "Live" | "Upcoming" | "Finished";
  className?: string;
};

export default function StatusBadge({ status, className = "" }: Props) {
  if (!status) return null;

  const baseClasses =
    "relative text-xs tracking-wider uppercase overflow-hidden ";

  const colorClasses = {
    Live: "bg-red-600 text-white dark:bg-red-700 ",
    Upcoming: "bg-red-600 text-white dark:bg-red-700 ",
    Finished: "bg-zinc-800 text-white ",
  };

  return <span className={baseClasses + colorClasses[status] + className}>{status}</span>;
}
