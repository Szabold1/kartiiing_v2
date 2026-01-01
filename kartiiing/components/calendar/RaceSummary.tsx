import { IRaceEvent } from "@kartiiing/shared-types";
import RenderEngineCategory from "@/components/calendar/renderRaceData/RenderEngineCategory";
import SectionTitle from "@/components/SectionTitle";
import RenderRaceLocation from "@/components/calendar/renderRaceData/RenderRaceLocation";
import RenderRaceDate from "@/components/calendar/renderRaceData/RenderRaceDate";

interface Props {
  race: IRaceEvent;
  className?: string;
}

export default function RaceSummary({ race, className = "" }: Props) {
  const { date, circuit, categories } = race;

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
          circuit={circuit}
          className="font-medium tracking-tight"
          isClickable
        />
      </div>

      <div>
        <SectionTitle>
          Championship{race.championships.length > 1 && "s"}
        </SectionTitle>
        {race.championships.map((champ) => {
          return <div className="font-medium tracking-tight">{champ.name}</div>;
        })}
      </div>

      {Object.keys(categories).length > 0 && (
        <div>
          <SectionTitle>
            Engine type{Object.keys(categories).length > 1 && "s"}
          </SectionTitle>
          <RenderEngineCategory
            engineCategoryPairs={categories}
            className="mt-1"
          />
        </div>
      )}

      {Object.values(categories).flat().length > 0 && (
        <div>
          <SectionTitle>Categories</SectionTitle>
          <RenderEngineCategory
            engineCategoryPairs={categories}
            className="mt-1"
            showAll
          />
        </div>
      )}
    </div>
  );
}
