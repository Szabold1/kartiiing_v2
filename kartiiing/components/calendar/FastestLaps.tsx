import { IRaceEvent } from "@kartiiing/shared-types";
import { badgeBase, grayGlassBase, lightDarkGlassBase } from "@/lib/classNames";
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
      {fastestLaps.map((lap) => (
        <li
          key={`${lap.category}`}
          className={`flex flex-col gap-2.5 p-3 rounded-xl ${lightDarkGlassBase}`}
        >
          <div className="flex items-start justify-between">
            <CategoryBadge label={lap.category} engineType={lap.engineType} />
            <div className="flex gap-1.5 items-center ml-1">
              <span className={`${badgeBase} ${grayGlassBase}`}>
                {lap.sessionType}
              </span>
              <span className={`${badgeBase} ${grayGlassBase}`}>
                {formatDate(lap.date, false)}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-medium tracking-tight">{lap.driverName}</span>
            <span className="font-mono font-semibold text-lg ml-1">
              {formatLapTime(lap.lapTime)}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
