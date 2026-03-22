import { IFastestLap } from "@kartiiing/shared-types";
import Flag from "react-world-flags";
import {
  formatDate,
  formatLapTime,
  cn,
  badgeBase,
  flagIconBase,
  grayGlassBase,
  lightDarkGlassBase,
} from "@/lib/utils";

type Props = {
  lap: IFastestLap;
};

const renderBadge = (label: string, className: string = "") => {
  return (
    <span className={cn(badgeBase, grayGlassBase, className)}>{label}</span>
  );
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
        {lap.eventTitle && renderBadge(lap.eventTitle)}
        {!lap.eventTitle && renderBadge(lap.sessionType)}
        {renderBadge(formatDate(lap.date), "whitespace-nowrap")}
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
