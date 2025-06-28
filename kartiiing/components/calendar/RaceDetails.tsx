import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import RenderRaceDate from "@/components/calendar/renderRaceData/RenderRaceDate";
import RenderRaceTitle from "@/components/calendar/renderRaceData/RenderRaceTitle";
import EngineCategoryDisplay from "@/components/calendar/renderRaceData/EngineCategoryDisplay";
import RenderRaceLocation from "@/components/calendar/renderRaceData/RenderRaceLocation";
import { toDay } from "@/lib/utils";
import { X } from "lucide-react";

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

      <RenderRaceLocation location={race.location} version="long" />

      <EngineCategoryDisplay
        engines={race.championship.engineTypes}
        categories={race.championship.categories}
        className="mt-4"
        showAll
      />
    </div>
  );
}
