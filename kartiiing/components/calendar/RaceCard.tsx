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
  onClick?: () => void;
};

export default function RaceCard({
  date,
  location,
  championship,
  upcomingDate,
  onClick = () => {},
}: Props) {
  const startDate = toDay(date.start);
  const endDate = toDay(date.end);
  const status = getRaceStatus(startDate, endDate, upcomingDate);

  return (
    <div
      className="relative border rounded-xl p-3.5 sm:p-3 flex flex-col bg-background w-full md:max-w-md shadow-md hover:shadow-lg dark:shadow-zinc-700/20 hover:dark:shadow-zinc-600/20 hover:border-dashed transition duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
      id={`${date.end}-${location.circuit.name}-${championship.name}`}
    >
      {status && (
        <div className="absolute top-0 right-0">
          <StatusBadge status={status} />
        </div>
      )}

      <div className="text-muted-foreground tracking-tighter uppercase leading-tight">
        {startDate.getTime() === endDate.getTime() ? (
          <span>{format(startDate, "dd MMM")}</span>
        ) : (
          <span>
            {format(startDate, "dd MMM")} - {format(endDate, "dd MMM")}
          </span>
        )}
      </div>

      <div className="text-muted-foreground text-sm flex items-center gap-2 mt-1.5">
        <Flag
          code={location.country.code}
          className="w-4.5 max-h-3.5 rounded-[0.15rem] object-cover"
        />
        {location.circuit.name}
      </div>

      <div className="font-medium tracking-tight flex-1">
        {championship.name ? championship.name : championship.nameLong}
        {championship.nameSeries ? ` ${championship.nameSeries}` : ""}
        {championship.roundNumber ? ` #${championship.roundNumber}` : ""}
      </div>

      <EngineCategoryDisplay
        engines={championship.engineTypes}
        categories={championship.categories}
        className="mt-2.5"
      />
    </div>
  );
}
