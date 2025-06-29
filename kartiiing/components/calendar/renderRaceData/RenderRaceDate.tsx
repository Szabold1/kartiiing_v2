import { format } from "date-fns";

type Props = {
    startDate: Date;
    endDate: Date;
    className?: string;
}

export default function RenderRaceDate({ startDate, endDate, className }: Props) {
  return (
    <div className={`text-muted-foreground uppercase ${className}`}>
      {startDate.getTime() === endDate.getTime() ? (
        <span>{format(startDate, "dd MMM")}</span>
      ) : (
        <span>
          {format(startDate, "dd MMM")} - {format(endDate, "dd MMM")}
        </span>
      )}
    </div>
  );
}
