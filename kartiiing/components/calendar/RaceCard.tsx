import EngineCategoryDisplay from "@/components/calendar/EngineCategoryDisplay";
import StatusBadge from "@/components/calendar/StatusBadge";
import type { Championship, Location, RaceDate } from "@/lib/types/RaceTypes";
import { toDay, getRaceStatus } from "@/lib/utils";
import { format } from "date-fns";
import Flag from "react-world-flags";

type Props = {
  date: RaceDate;
  location: Location;
  championship: Championship;
  upcomingDate: Date | null;
};

export default function RaceCard({
  date,
  location,
  championship,
  upcomingDate,
}: Props) {
  const startDate = toDay(date.start);
  const endDate = toDay(date.end);
  const status = getRaceStatus(startDate, endDate, upcomingDate);

  return (
    <div className="relative border rounded-xl p-3.5 sm:p-3 flex flex-col gap-2.5 bg-background w-full md:max-w-md shadow-md hover:shadow-lg dark:shadow-zinc-700/20 hover:dark:shadow-zinc-600/20 transition cursor-pointer overflow-hidden">
      {status && (
        <div className="absolute top-0 right-0">
          <StatusBadge status={status} />
        </div>
      )}
      <div className="flex items-center gap-2.5">
        <Flag
          code={location.country.code}
          className="max-w-7 max-h-5.5 rounded-[0.2rem] object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="text-muted-foreground tracking-tighter uppercase leading-tight">
          {startDate.getTime() === endDate.getTime() ? (
            <span>{format(startDate, "dd MMM")}</span>
          ) : (
            <span>
              {format(startDate, "dd MMM")} - {format(endDate, "dd MMM")}
            </span>
          )}
        </div>
        <div className="font-semibold">
          {championship.name ? championship.name : championship.nameLong}
          {championship.nameSeries ? ` ${championship.nameSeries}` : ""}
          {championship.roundNumber ? ` #${championship.roundNumber}` : ""}
        </div>
        <div className="text-muted-foreground text-sm">
          {location.circuit.nameLong}
        </div>
      </div>

      <EngineCategoryDisplay
        engines={championship.engineTypes}
        categories={championship.categories}
      />
    </div>
  );
}
