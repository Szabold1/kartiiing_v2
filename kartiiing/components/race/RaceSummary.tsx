import { IRaceEvent } from "@kartiiing/shared-types";
import EngineCategory from "@/components/shared/race-data/EngineCategory";
import SectionTitle from "@/components/SectionTitle";
import RaceLocation from "@/components/shared/race-data/RaceLocation";
import RaceDate from "@/components/shared/race-data/RaceDate";
import { cn } from "@/lib/utils";

interface Props {
  race: IRaceEvent;
  className?: string;
}

export default function RaceSummary({ race, className = "" }: Props) {
  const { date, circuit, categories } = race;

  return (
    <div className={cn("space-y-3.5", className)}>
      <div>
        <SectionTitle>Date</SectionTitle>
        <RaceDate
          date={date}
          className="font-medium tracking-tight"
          withYear
          showRelative
        />
      </div>

      <div>
        <SectionTitle>Location</SectionTitle>
        <RaceLocation
          circuit={circuit}
          className="font-medium tracking-tight"
          isClickable
        />
      </div>

      <div>
        <SectionTitle>
          Championship{race.championships.length > 1 && "s"}
        </SectionTitle>
        {race.championships.map((champ) => (
          <div key={champ.id} className="font-medium tracking-tight">
            {champ.name}
          </div>
        ))}
      </div>

      {Object.keys(categories).length > 0 && (
        <div>
          <SectionTitle>
            Engine type{Object.keys(categories).length > 1 && "s"}
          </SectionTitle>
          <EngineCategory engineCategoryPairs={categories} className="mt-1" />
        </div>
      )}

      {Object.values(categories).flat().length > 0 && (
        <div>
          <SectionTitle>Categories</SectionTitle>
          <EngineCategory
            engineCategoryPairs={categories}
            className="mt-1"
            showAll
          />
        </div>
      )}
    </div>
  );
}
