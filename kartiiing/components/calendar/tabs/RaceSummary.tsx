import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import RenderEngineCategory from "@/components/calendar/renderRaceData/RenderEngineCategory";
import SectionTitle from "@/components/SectionTitle";
import RenderRaceLocation from "@/components/calendar/renderRaceData/RenderRaceLocation";
import RenderRaceDate from "@/components/calendar/renderRaceData/RenderRaceDate";

interface Props {
  race: RaceEventGrouped;
  className?: string;
}

export default function RaceSummary({ race, className = "" }: Props) {
  const { date, location, championship } = race;

  return (
    <div className={`space-y-3.5 ${className}`}>
      <div>
        <SectionTitle>Date</SectionTitle>
        <RenderRaceDate
          date={date}
          className="font-medium tracking-tight"
          withYear
          showRelative
        />
      </div>

      <div>
        <SectionTitle>Location</SectionTitle>
        <RenderRaceLocation
          location={location}
          className="font-medium"
          version="long"
          isClickable
        />
      </div>

      {championship.engineTypes.length > 0 && (
        <div>
          <SectionTitle>
            Engine type{championship.engineTypes.length > 1 && "s"}
          </SectionTitle>
          <RenderEngineCategory
            engines={championship.engineTypes}
            categories={championship.categories}
            className="mt-1"
          />
        </div>
      )}

      {championship.categories.length > 0 && (
        <div>
          <SectionTitle>Categories</SectionTitle>
          <RenderEngineCategory
            engines={championship.engineTypes}
            categories={championship.categories}
            className="mt-1"
            showAll
          />
        </div>
      )}
    </div>
  );
}
