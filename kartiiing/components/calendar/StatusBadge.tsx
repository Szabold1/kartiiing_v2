type Props = {
  status: "Live" | "Upcoming" | "Finished";
};

export default function StatusBadge({ status }: Props) {
  if (!status) return null;

  const baseClasses =
    "relative text-xs tracking-wider uppercase pl-3.5 pr-2.5 py-2 rounded-bl-xl overflow-hidden ";

  const colorClasses = {
    Live: "bg-red-600 text-white dark:bg-red-700",
    Upcoming: "bg-red-600 text-white dark:bg-red-700",
    Finished: "bg-zinc-800 text-white",
  };

  return <span className={baseClasses + colorClasses[status]}>{status}</span>;
}
