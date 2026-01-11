"use client";

import { IRaceEvent, RaceStatus } from "@kartiiing/shared-types";
import { X } from "lucide-react";
import RaceSummary from "@/components/calendar/RaceSummary";
import RaceActions from "./RaceActions";
import FastestLaps from "./FastestLaps";
import {
  lightDarkGlassBase,
  lightDarkGlassHover,
  liveContainerBase,
} from "@/lib/classNames";
import StatusResultsBadge from "./StatusResultsBadge";
import RaceDetailsSection from "./RaceDetailsSection";

type Props = {
  race: IRaceEvent;
  onClose?: () => void;
};

export default function RaceDetails({ race, onClose }: Props) {
  const resultsLinks = race.links?.results || [];

  return (
    <div className="p-2.5 sm:p-3.5 pt-1.5 sm:pt-1.5 h-full relative min-h-90 overflow-auto">
      <div
        className={`flex justify-end items-center p-1.5 mb-5.5 rounded-xl ${lightDarkGlassBase} 
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

      <div className="flex flex-col px-2.5 mb-6 gap-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {race.title}
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        <RaceDetailsSection title="Summary">
          <RaceSummary race={race} />
        </RaceDetailsSection>
        {race.fastestLaps && (
          <RaceDetailsSection title="Fastest Laps">
            <FastestLaps race={race} />
          </RaceDetailsSection>
        )}
      </div>
    </div>
  );
}
