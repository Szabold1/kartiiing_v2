"use client";

import PageHeader from "@/components/PageHeader";
import GoBackBtn from "@/components/shared/btns/GoBackBtn";
import RaceActions from "./RaceActions";
import { lightDarkGlassHover } from "@/lib/classNames";
import { cn } from "@/lib/utils";
import StatusResultsBadge from "@/components/shared/badges/StatusResultsBadge";
import { useRaceStore } from "@/lib/stores/raceStore";

export default function RaceDetailsHeader() {
  const race = useRaceStore((state) => state.race);

  if (!race) return null;

  const resultsLinks = race.links?.results || [];

  const headerAction = (
    <div className="flex items-center gap-2">
      <GoBackBtn className={cn(lightDarkGlassHover, "mr-1")} />
      {(race.status || resultsLinks.length > 0) && (
        <>
          <StatusResultsBadge
            race={race}
            className="p-3.5 rounded-lg font-medium"
            heightValue="10.5"
          />
          <RaceActions />
        </>
      )}
    </div>
  );

  return (
    <PageHeader
      title={race.title || ""}
      headerAction={headerAction}
      actionLayout="vertical"
    />
  );
}
