import { IRaceEvent } from "@kartiiing/shared-types";
import {
  badgeBase,
  lightDarkGlassBase,
  slateGlassBase,
} from "@/lib/classNames";
import CategoryBadge from "./CategoryBadge";
import { formatDate, formatLapTime } from "@/lib/utils";

type Props = {
  race: IRaceEvent;
};

export default function FastestLaps({ race }: Props) {
  const fastestLaps = race.fastestLaps || [];

  if (fastestLaps.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        No fastest laps recorded
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2.5">
      {fastestLaps.map((lap, index) => (
        <li
          key={`${lap.category}-${index}`}
          className={`flex flex-col gap-2.5 p-3 rounded-xl ${lightDarkGlassBase}`}
        >
          <div className="flex items-start justify-between">
            <CategoryBadge label={lap.category} engineType={lap.engineType} />
            <div className="flex gap-1.5">
              <span className={`${badgeBase} ${slateGlassBase}`}>
                {lap.sessionType}
              </span>
              <span className={`${badgeBase} ${slateGlassBase}`}>
                {formatDate(lap.date)}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-medium tracking-tight">{lap.driverName}</span>
            <span className="font-mono font-semibold text-lg">
              {formatLapTime(lap.lapTime)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
