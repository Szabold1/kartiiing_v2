import RenderEngineCategory from "@/components/calendar/renderRaceData/RenderEngineCategory";
import StatusBadge from "@/components/calendar/StatusBadge";
import { IRaceEvent, RaceStatus } from "@kartiiing/shared-types";
import RenderRaceDate from "@/components/calendar/renderRaceData/RenderRaceDate";
import RenderRaceTitle from "@/components/calendar/renderRaceData/RenderRaceTitle";
import RenderRaceLocation from "@/components/calendar/renderRaceData/RenderRaceLocation";
import { toDay } from "@/lib/utils";
import { lightDarkGlassHover } from "@/lib/classNames";

type Props = {
  race: IRaceEvent;
  onClick?: () => void;
  variant?: "card" | "row";
};

export default function RaceCard({
  race,
  onClick = () => {},
  variant = "card",
}: Props) {
  const { date, circuit, championships, categories } = race;
  const championship = championships[0];
  const id = `${toDay(date.end)}-${circuit.nameShort}-${championship.title}`;
  const liveContainerStyle =
    "border-red-500/20 bg-red-100/50 dark:border-red-900/50 dark:bg-red-900/25 hover:border-red-500/70 hover:dark:border-red-900";

  if (variant === "row") {
    return (
      <div
        className={`p-[0.7rem] flex cursor-pointer overflow-hidden rounded-xl ${lightDarkGlassHover} ${
          race.status === RaceStatus.LIVE || race.status === RaceStatus.UPNEXT
            ? `${liveContainerStyle}`
            : "border-transparent dark:border-transparent dark:bg-transparent shadow-none"
        }`}
        onClick={onClick}
        id={id}
      >
        <div className="flex-1 flex items-center gap-4">
          {race.status && (
            <StatusBadge status={race.status} className="px-2 py-1 rounded-md" />
          )}
          <RenderRaceDate
            date={date}
            className="text-sm text-muted-foreground min-w-[7rem] tracking-tight"
          />
          <RenderRaceLocation
            circuit={circuit}
            className="text-sm font-medium min-w-[8rem] max-w-[8rem] text-muted-foreground"
          />
          <RenderRaceTitle
            championship={championship}
            className="font-semibold truncate flex-1"
          />
          <RenderEngineCategory
            engineCategoryPairs={categories}
            className="ml-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative p-3.5 sm:p-3 flex flex-col md:max-w-md cursor-pointer overflow-hidden rounded-xl ${lightDarkGlassHover} ${
        race.status === RaceStatus.LIVE || race.status === RaceStatus.UPNEXT
          ? liveContainerStyle
          : ""
      }`}
      onClick={onClick}
      id={id}
    >
      {race.status && (
        <div className="absolute top-0 -right-0.5">
          <StatusBadge
            status={race.status}
            className="pl-3.5 pr-3 py-2 rounded-bl-xl"
          />
        </div>
      )}
      <RenderRaceDate
        date={date}
        className="leading-tight tracking-tighter text-muted-foreground"
      />
      <RenderRaceLocation
        circuit={circuit}
        className="text-muted-foreground text-sm mt-1.5 font-medium"
      />
      <RenderRaceTitle
        championship={championship}
        className="font-semibold tracking-tight flex-1"
      />
      <RenderEngineCategory
        engineCategoryPairs={categories}
        className="mt-2"
      />
    </div>
  );
}
