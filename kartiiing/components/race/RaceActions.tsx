"use client";

import RaceActionButton from "./RaceActionButton";
import { Timer, TvMinimalPlay } from "lucide-react";
import { RaceStatus } from "@kartiiing/shared-types";
import { grayGlassHover, redGlassHover } from "@/lib/classNames";
import { useRaceStore } from "@/lib/stores/raceStore";

export default function RaceActions() {
  const race = useRaceStore((state) => state.race);
  if (!race) return null;

  const isLive = race.status === RaceStatus.LIVE;
  const isFinished = race.status === RaceStatus.FINISHED;

  if (!isLive && !isFinished) return null;

  const handleClick = (type: "timing" | "streaming") => {
    const year = new Date(race.date.start).getFullYear();
    const livePrefix = isLive ? "live " : "";

    const searchQuery = encodeURIComponent(
      `${year} ${race.title} ${race.circuit.locationName} ${livePrefix}${type}`,
    );
    const searchUrl = `https://www.google.com/search?q=${searchQuery}`;

    window.open(searchUrl, "_blank");
  };

  return (
    <div className="flex items-center gap-1.5">
      {isLive && (
        <RaceActionButton
          onClick={() => handleClick("timing")}
          className={redGlassHover}
        >
          <Timer />
        </RaceActionButton>
      )}

      <RaceActionButton
        onClick={() => handleClick("streaming")}
        className={isLive ? redGlassHover : grayGlassHover}
      >
        <TvMinimalPlay />
      </RaceActionButton>
    </div>
  );
}
