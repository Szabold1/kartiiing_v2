import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import RenderRaceDate from "@/components/calendar/renderRaceData/RenderRaceDate";
import RenderRaceTitle from "@/components/calendar/renderRaceData/RenderRaceTitle";
import EngineCategoryDisplay from "@/components/calendar/renderRaceData/EngineCategoryDisplay";
import { toDay } from "@/lib/utils";
import { X } from "lucide-react";
import Flag from "react-world-flags";

type Props = {
  race: RaceEventGrouped;
  onClose?: () => void;
};

export default function RaceDetails({ race, onClose }: Props) {
  return (
    <div className="p-4 sm:p-4.5">
      <div className="flex border-b border-dashed pb-2.5 mb-3 gap-2">
        <RenderRaceTitle
          championship={race.championship}
          className="text-lg font-semibold tracking-tight"
        />

        <X
          className="w-8 h-8 p-2 border rounded-sm cursor-pointer text-zinc-600 dark:text-zinc-300 hover:bg-accent ml-auto flex-shrink-0"
          onClick={onClose}
        />
      </div>

      <RenderRaceDate
        startDate={toDay(race.date.start)}
        endDate={toDay(race.date.end)}
        className="tracking-tight"
      />

      <div className="text-muted-foreground text-sm flex items-center gap-2.5 mt-1.5">
        <Flag
          code={race.location.country.code}
          className="w-5.5 max-h-4 rounded-[0.15rem] object-cover"
        />
        {race.location.circuit.name} - {race.location.circuit.nameLong}
      </div>

      <EngineCategoryDisplay
        engines={race.championship.engineTypes}
        categories={race.championship.categories}
        className="mt-4"
        showAll
      />
    </div>
  );
}
