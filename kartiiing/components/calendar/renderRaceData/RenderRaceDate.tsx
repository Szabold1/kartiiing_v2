import { format } from "date-fns";
import { getRelativeText, toDay } from "@/lib/utils";
import { RaceDate } from "@/lib/types/RaceTypes";

type Props = {
  date: RaceDate;
  className?: string;
  withYear?: boolean;
  showRelative?: boolean;
};

export default function RenderRaceDate({
  date,
  className = "",
  withYear = false,
  showRelative = false,
}: Props) {
  const startDate = toDay(date.start);
  const endDate = toDay(date.end);
  const isSameDay = startDate.getTime() === endDate.getTime();
  const isSameMonth =
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();

  return (
    <div
      className={`uppercase ${className} ${
        showRelative && "flex flex-wrap items-center gap-x-2"
      }`}
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
