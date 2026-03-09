"use client";

import { Masonry } from "masonic";
import { ReactNode, useMemo } from "react";
import RaceSummary from "@/components/race/RaceSummary";
import CircuitInfo from "@/components/circuit/CircuitInfo";
import RaceDetailsSection from "./RaceDetailsSection";
import FastestLapsWithDropdown from "@/components/circuit/FastestLapsWithDropdown";
import { useRaceStore } from "@/lib/stores/raceStore";

type SectionItem = {
  id: string;
  content: ReactNode;
};

export default function RaceDetailsGrid() {
  const race = useRaceStore((state) => state.race);

  const minSectionWidth = 320;
  const maxSectionWidth = 450;
  const sectionGap = 32;
  const sectionCount =
    race && race.fastestLaps && race.fastestLaps.length > 0 ? 3 : 2;

  const masonryMaxWidth =
    sectionCount * maxSectionWidth + (sectionCount - 1) * sectionGap;

  const sections = useMemo<SectionItem[]>(() => {
    if (!race) return [];

    const items: SectionItem[] = [
      {
        id: "summary",
        content: (
          <RaceDetailsSection title="Summary">
            <RaceSummary />
          </RaceDetailsSection>
        ),
      },
      {
        id: "circuit",
        content: (
          <RaceDetailsSection
            title={`Circuit Info${
              race.circuit.circuitFastestLaps &&
              race.circuit.circuitFastestLaps.length > 0
                ? " & Lap Records"
                : ""
            }`}
            className="!p-0"
          >
            <CircuitInfo circuit={race.circuit} />
          </RaceDetailsSection>
        ),
      },
    ];

    if (race.fastestLaps && race.fastestLaps.length > 0) {
      items.push({
        id: "event-fastest-laps",
        content: (
          <RaceDetailsSection title="Event Fastest Laps">
            <FastestLapsWithDropdown fastestLaps={race.fastestLaps} />
          </RaceDetailsSection>
        ),
      });
    }

    return items;
  }, [race]);

  if (!race || !sections.length) return null;

  return (
    <div className="w-full my-8">
      <div className="w-full" style={{ maxWidth: masonryMaxWidth }}>
        <Masonry
          key={race.id}
          items={sections}
          columnGutter={sectionGap}
          columnWidth={minSectionWidth}
          render={({ data }: { data: SectionItem }) => <>{data.content}</>}
        />
      </div>
    </div>
  );
}
