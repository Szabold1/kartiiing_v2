import { useRouter } from "next/navigation";
import RenderEngineCategory from "@/components/calendar/renderRaceData/RenderEngineCategory";
import StatusResultsBadge from "@/components/calendar/StatusResultsBadge";
import { IRaceEvent, RaceStatus } from "@kartiiing/shared-types";
import RenderRaceDate from "@/components/calendar/renderRaceData/RenderRaceDate";
import RenderRaceLocation from "@/components/calendar/renderRaceData/RenderRaceLocation";
import { lightDarkGlassHover, liveContainerHover } from "@/lib/classNames";
import { generateSlug } from "@/lib/utils";

type Props = {
  race: IRaceEvent;
  variant?: "card" | "row";
};

export default function RaceCard({ race, variant = "card" }: Props) {
  const router = useRouter();
  const { id, date, circuit, categories } = race;
  const year = date.start.split("-")[0];
  const hasResults = race.links?.results && race.links.results.length > 0;
  const addDatePadding = variant === "row" && !race.status && !hasResults;
  const slug = generateSlug(
    `${year} ${race?.title || ""} ${circuit?.locationName || ""} ${id}`,
  );
  const raceLink = `?race=${slug}`;

  const handleRaceClick = () => {
    router.push(raceLink, { scroll: false });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRaceClick();
    }
  };

  if (variant === "row") {
    return (
      <div
        onClick={handleRaceClick}
        className={`min-h-[3.3rem] p-[0.4rem] flex cursor-pointer overflow-hidden rounded-xl ${lightDarkGlassHover} ${
          race.status === RaceStatus.LIVE
            ? `${liveContainerHover}`
            : "border-transparent dark:border-transparent dark:bg-transparent shadow-none"
        }`}
        id={`${id}`}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="flex-1 flex items-center gap-4">
          {race.status || hasResults ? (
            <span
              className={`${addDatePadding ? "min-w-[6.6rem]" : "min-w-[6.5rem]"}`}
            >
              <StatusResultsBadge
                race={race}
                className="px-3 rounded-md "
                heightValue="9.5"
              />
            </span>
          ) : null}
          <RenderRaceDate
            date={date}
            className={`text-sm text-muted-foreground min-w-[7rem] tracking-tight ${addDatePadding ? "pl-2" : ""}`}
          />
          <RenderRaceLocation
            circuit={circuit}
            className="text-sm font-medium min-w-[8rem] max-w-[8rem] text-muted-foreground"
          />
          <div className="font-semibold truncate flex-1">{race.title}</div>
          <RenderEngineCategory
            engineCategoryPairs={categories}
            className="ml-auto"
            badgeClassName="px-2.5 py-2 xl:px-3"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleRaceClick}
      className={`relative p-3.5 sm:p-3 flex flex-col md:max-w-md cursor-pointer overflow-hidden rounded-xl w-full ${lightDarkGlassHover} ${
        race.status === RaceStatus.LIVE ? liveContainerHover : ""
      }`}
      id={`${id}`}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {race.status || hasResults ? (
        <div className="absolute -top-0.5 -right-0.5">
          <StatusResultsBadge
            race={race}
            className="pl-4 pr-3.5 rounded-bl-xl"
          />
        </div>
      ) : null}
      <RenderRaceDate
        date={date}
        className="leading-tight tracking-tighter text-muted-foreground"
      />
      <RenderRaceLocation
        circuit={circuit}
        className="text-muted-foreground text-sm mt-1.5 font-medium"
      />
      <div className="font-semibold tracking-tight flex-1">{race.title}</div>
      <RenderEngineCategory engineCategoryPairs={categories} className="mt-2" />
    </div>
  );
}
