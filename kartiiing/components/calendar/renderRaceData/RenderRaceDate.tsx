import { format } from "date-fns";
import { getRelativeText } from "@/lib/utils";

type Props = {
  startDate: Date;
  endDate: Date;
  className?: string;
  withYear?: boolean;
  showRelative?: boolean;
};

export default function RenderRaceDate({
  startDate,
  endDate,
  className = "",
  withYear = false,
  showRelative = false,
}: Props) {
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
