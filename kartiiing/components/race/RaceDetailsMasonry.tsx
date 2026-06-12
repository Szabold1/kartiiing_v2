"use client";

import { Masonry } from "masonic";
import { ReactNode, useMemo } from "react";
import RaceSummary from "@/components/race/RaceSummary";
import WeatherDayList from "@/components/weather/WeatherDayList";
import CircuitInfo from "@/components/circuit/CircuitInfo";
import RaceDetailsSection from "@/components/race/RaceDetailsSection";
import FastestLapsWithDropdown from "@/components/circuit/FastestLapsWithDropdown";
import { IRaceEventDetail } from "@kartiiing/shared";

type SectionItem = {
  id: string;
  content: ReactNode;
};

type Props = {
  race: IRaceEventDetail;
};

function getSectionsForRace(race: IRaceEventDetail): SectionItem[] {
  const weatherDays = race.weatherByDays || [];
  const fastestLaps = race.fastestLaps || [];

  const items: SectionItem[] = [
    {
      id: "summary",
      content: (
        <RaceDetailsSection title="Summary">
          <RaceSummary race={race} />
        </RaceDetailsSection>
      ),
    },
    ...(weatherDays.length > 0
      ? [
          {
            id: "weather",
            content: (
              <RaceDetailsSection title="Weather">
                <WeatherDayList days={weatherDays} />
              </RaceDetailsSection>
            ),
          },
        ]
      : []),
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
          <CircuitInfo circuit={race.circuit} race={race} />
        </RaceDetailsSection>
      ),
    },
    ...(fastestLaps.length > 0
      ? [
          {
            id: "event-fastest-laps",
            content: (
              <RaceDetailsSection title="Event Fastest Laps">
                <FastestLapsWithDropdown fastestLaps={fastestLaps} />
              </RaceDetailsSection>
            ),
          },
        ]
      : []),
  ];
  return items;
}

export default function RaceDetailsMasonry({ race }: Props) {
  const minSectionWidth = 330;
  const sectionGap = 32;

  const sections = useMemo<SectionItem[]>(() => {
    return getSectionsForRace(race);
  }, [race]);

  if (!sections.length) return null;

  return (
    <Masonry
      key={race.id}
      items={sections}
      columnGutter={sectionGap}
      columnWidth={minSectionWidth}
      render={({ data }: { data: SectionItem }) => <>{data.content}</>}
      className="my-8"
    />
  );
}
