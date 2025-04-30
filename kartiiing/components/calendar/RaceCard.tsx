import EngineCategoryDisplay from "@/components/calendar/EngineCategoryDisplay";
import StatusBadge from "@/components/calendar/StatusBadge";
import type { Championship, Date, Location } from "@/lib/types/RaceTypes";
import { format, parseISO, isWithinInterval, isBefore } from "date-fns";
import Flag from "react-world-flags";

type Props = {
  date: Date;
  location: Location;
  championship: Championship;
  upcomingDate: string | null;
};

export default function RaceCard({
  date,
  location,
  championship,
  upcomingDate,
}: Props) {
  const now = new Date();
  const startDate = parseISO(date.start);
  const endDate = parseISO(date.end);

  const getRaceStatus = () => {
    if (isWithinInterval(now, { start: startDate, end: endDate })) {
      return "Live";
    }
    if (
      isBefore(now, startDate) &&
      upcomingDate &&
      endDate.getTime() === parseISO(upcomingDate).getTime()
    ) {
      return "Upcoming";
    }
    if (isBefore(endDate, now)) {
      return "Finished";
    }
    return null;
  };

  const status = getRaceStatus();

  return (
    <div className="relative border rounded-xl p-3.5 sm:p-3 flex flex-col gap-2.5 bg-background w-full shadow-md hover:shadow-lg dark:shadow-zinc-700/20 hover:dark:shadow-zinc-600/20 transition cursor-pointer overflow-hidden">
      {status && (
        <div className="absolute -top-0.5 right-0">
          <StatusBadge status={status} />
        </div>
      )}

      <Flag
        code={location.country.code}
        className="w-7 h-4.5 rounded-[0.25rem] object-cover"
      />

      <div className="flex flex-col gap-1">
        <div className="text-muted-foreground tracking-tighter uppercase leading-tight">
          {`${format(startDate, "dd MMM")} - ${format(endDate, "dd MMM")}`}
        </div>
        <div className="font-semibold">
          {championship.short_name
            ? championship.short_name
            : championship.base_name}
          {championship.series_name ? ` ${championship.series_name}` : ""}
          {championship.round_number ? ` #${championship.round_number}` : ""}
        </div>
        <div className="text-muted-foreground text-sm">
          {location.circuit.name}
        </div>
      </div>

      <EngineCategoryDisplay
        engines={championship.engine_types}
        categories={championship.categories}
      />
    </div>
  );
}
