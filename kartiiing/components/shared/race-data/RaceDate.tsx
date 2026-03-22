import { format } from "date-fns";
import { getRelativeText, toDay, cn } from "@/lib/utils";
import { IRaceEventDate } from "@kartiiing/shared-types";

type Props = {
  date: IRaceEventDate;
  className?: string;
  withYear?: boolean;
  showRelative?: boolean;
};

export default function RaceDate({
  date,
  className = "",
  withYear = false,
  showRelative = false,
}: Props) {
  if (!date.start && !date.end) {
    return (
      <span className={cn("text-muted-foreground", className)}>Date TBA</span>
    );
  }

  const startDate = toDay((date.start || date.end)!);
  const endDate = toDay((date.end || date.start)!);
  const isSameDay = startDate.getTime() === endDate.getTime();
  const isSameMonth =
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();

  return (
    <div
      className={cn(
        "uppercase",
        showRelative && "flex flex-wrap items-center gap-x-2",
        className,
      )}
    >
      {isSameDay ? (
        // single day
        <span>{format(startDate, withYear ? "dd MMM yyyy" : "dd MMM")}</span>
      ) : isSameMonth ? (
        // same month, different days
        <span>
          {format(startDate, "dd")} -{" "}
          {format(endDate, withYear ? "dd MMM yyyy" : "dd MMM")}
        </span>
      ) : (
        // different months
        <span>
          {format(startDate, withYear ? "dd MMM yyyy" : "dd MMM")} -{" "}
          {format(endDate, withYear ? "dd MMM yyyy" : "dd MMM")}
        </span>
      )}

      {showRelative && (
        <span className="text-muted-foreground lowercase inline-flex">
          {"(" + getRelativeText(startDate, endDate) + ")"}
        </span>
      )}
    </div>
  );
}
