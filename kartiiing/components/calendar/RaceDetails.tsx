"use client";

import { IRaceEventDetail, RaceStatus } from "@kartiiing/shared-types";
import { X } from "lucide-react";
import RaceSummary from "@/components/calendar/RaceSummary";
import RaceActions from "./RaceActions";
import CircuitInfo from "./CircuitInfo";
import {
  lightDarkGlassBase,
  lightDarkGlassHover,
  liveContainerBase,
} from "@/lib/classNames";
import StatusResultsBadge from "./StatusResultsBadge";
import RaceDetailsSection from "./RaceDetailsSection";
import FastestLapsWithDropdown from "./FastestLapsWithDropdown";

type Props = {
  race: IRaceEventDetail;
  onClose?: () => void;
};

export default function RaceDetails({ race, onClose }: Props) {
  const resultsLinks = race.links?.results || [];

  return (
    <div className="p-2.5 sm:p-3.5 pt-1.5 sm:pt-1.5 h-full relative min-h-90 overflow-auto">
      <div
        className={`sticky top-0 z-50 flex justify-end items-center p-1.5 rounded-xl ${lightDarkGlassBase} 
        ${race.status === RaceStatus.LIVE ? liveContainerBase : ""}`}
      >
        {(race.status || resultsLinks.length > 0) && (
          <div className="flex items-center gap-1.5">
            <StatusResultsBadge
              race={race}
              className="p-3.5 rounded-lg font-medium"
              heightValue="10.5"
            />
            <RaceActions race={race} />
          </div>
        )}
        {onClose && (
          <X
            className={`w-10.5 h-10.5 rounded-lg ${lightDarkGlassHover} p-2 cursor-pointer ml-auto`}
            onClick={onClose}
          />
        )}
      </div>

      <div className="flex flex-col gap-8 mt-8">
        <h2 className="text-2xl font-semibold tracking-tight px-2.5">
          {race.title}
        </h2>
        <RaceDetailsSection title="Summary">
          <RaceSummary race={race} />
        </RaceDetailsSection>
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
        {race.fastestLaps && race.fastestLaps.length > 0 && (
          <RaceDetailsSection title="Event Fastest Laps">
            <FastestLapsWithDropdown fastestLaps={race.fastestLaps} />
          </RaceDetailsSection>
        )}
      </div>
    </div>
  );
}
