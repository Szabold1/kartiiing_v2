"use client";

import { IRaceEvent, RaceStatus } from "@kartiiing/shared-types";
import { X } from "lucide-react";
import RaceSummary from "@/components/calendar/RaceSummary";
import RaceActions from "./RaceActions";
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
    <div className="p-2.5 sm:p-3.5 h-full relative min-h-90">
      <div
        className={`flex justify-end items-center p-1.5 mb-4.5 rounded-xl ${lightDarkGlassBase} 
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
            className={`w-10.5 h-10.5 rounded-lg ${lightDarkGlassHover} p-2 rounded-lg cursor-pointer ml-auto`}
            onClick={onClose}
          />
        )}
      </div>

      <div className="flex flex-col px-2.5 mb-4.5 gap-2">
        <div className="text-2xl font-semibold tracking-tight">
          {race.title}
        </div>
      </div>

      <RaceDetailsSection title="Summary">
        <RaceSummary race={race} />
      </RaceDetailsSection>
    </div>
  );
}
