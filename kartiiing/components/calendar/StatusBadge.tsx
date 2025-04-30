type Props = {
  status: "Live" | "Upcoming" | "Finished";
};

export default function StatusBadge({ status }: Props) {
  if (!status) return null;

  const baseClasses =
    "relative text-xs font-semibold uppercase pl-3 pr-2.5 py-1.5 rounded-bl-xl overflow-hidden ";

  const colorClasses = {
    Live: "bg-red-500 text-white dark:bg-red-700",
    Upcoming: "bg-red-500 text-white dark:bg-red-700",
    Finished: "bg-zinc-950 text-white dark:bg-zinc-800",
  };

  return <span className={baseClasses + colorClasses[status]}>{status}</span>;
}
