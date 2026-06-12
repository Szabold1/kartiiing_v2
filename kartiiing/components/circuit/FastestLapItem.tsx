import { IFastestLap } from "@kartiiing/shared";
import Flag from "react-world-flags";
import {
  formatDate,
  formatLapTime,
  cn,
  flagIconBase,
  lightDarkGlassBase,
} from "@/lib/utils";
import Badge from "@/components/shared/badges/Badge";

type Props = {
  lap: IFastestLap;
};

export default function FastestLapItem({ lap }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 p-2.5 rounded-xl",
        lightDarkGlassBase,
      )}
    >
      <div className="flex gap-1.5 justify-between">
        {lap.eventTitle && <Badge>{lap.eventTitle}</Badge>}
        {!lap.eventTitle && <Badge>{lap.sessionType}</Badge>}
        <Badge className="whitespace-nowrap">{formatDate(lap.date)}</Badge>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-2">
          {lap.driverCountry && (
            <Flag
              code={lap.driverCountry.code}
              alt={`${lap.driverCountry.name} flag`}
              title={lap.driverCountry.name}
              className={flagIconBase}
            />
          )}
          <span className="font-medium tracking-tight">{lap.driverName}</span>
        </div>
        <span className="font-mono font-semibold text-lg ml-1">
          {formatLapTime(lap.lapTime)}
        </span>
      </div>
    </div>
  );
}
