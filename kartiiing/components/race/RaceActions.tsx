"use client";

import RaceActionBtn from "@/components/shared/btns/RaceActionBtn";
import { Timer, TvMinimalPlay } from "lucide-react";
import { RaceStatus, IRaceEvent } from "@kartiiing/shared-types";
import { grayGlassHover, redGlassHover } from "@/lib/classNames";

type Props = {
  race: IRaceEvent;
};

export default function RaceActions({ race }: Props) {
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
    <>
      {isLive && (
        <RaceActionBtn
          onClick={() => handleClick("timing")}
          className={redGlassHover}
        >
          <Timer />
        </RaceActionBtn>
      )}

      <RaceActionBtn
        onClick={() => handleClick("streaming")}
        className={isLive ? redGlassHover : grayGlassHover}
      >
        <TvMinimalPlay />
      </RaceActionBtn>
    </>
  );
}
