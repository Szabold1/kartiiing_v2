import EngineCategoryDisplay from "@/components/calendar/renderRaceData/EngineCategoryDisplay";
import StatusBadge from "@/components/calendar/StatusBadge";
import type { Championship, Location, RaceDate } from "@/lib/types/RaceTypes";
import { toDay, getRaceStatus } from "@/lib/utils";
import Flag from "react-world-flags";
import RenderRaceDate from "@/components/calendar/renderRaceData/RenderRaceDate";
import RenderRaceTitle from "./renderRaceData/RenderRaceTitle";

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
  const status = getRaceStatus(
    toDay(date.start),
    toDay(date.end),
    upcomingDate
  );

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

      <RenderRaceDate
        startDate={toDay(date.start)}
        endDate={toDay(date.end)}
        className="leading-tight tracking-tighter"
      />

      <div className="text-muted-foreground text-sm flex items-center gap-2 mt-1.5">
        <Flag
          code={location.country.code}
          className="w-4.5 max-h-3.5 rounded-[0.15rem] object-cover"
        />
        {location.circuit.name}
      </div>

      <RenderRaceTitle
        championship={championship}
        className="font-medium tracking-tight flex-1"
      />

      <EngineCategoryDisplay
        engines={championship.engineTypes}
        categories={championship.categories}
        className="mt-2.5"
      />
    </div>
  );
}
