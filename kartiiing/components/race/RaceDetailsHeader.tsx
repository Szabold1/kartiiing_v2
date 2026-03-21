"use client";

import PageHeader from "@/components/shared/PageHeader";
import GoBackBtn from "@/components/shared/btns/GoBackBtn";
import RaceActions from "@/components/race/RaceActions";
import { cn, lightDarkGlassHover } from "@/lib/utils";
import StatusResultsBadge from "@/components/shared/badges/StatusResultsBadge";
import { IRaceEventDetail } from "@kartiiing/shared-types";

type Props = {
  race: IRaceEventDetail;
};

export default function RaceDetailsHeader({ race }: Props) {
  const resultsLinks = race.links?.results || [];

  const headerAction = (
    <div className="flex items-center gap-1.5">
      <GoBackBtn className={cn(lightDarkGlassHover, "mr-2")} />
      {(race.status || resultsLinks.length > 0) && (
        <>
          <StatusResultsBadge
            race={race}
            className="p-3.5 rounded-lg"
            heightValue="10.5"
          />
          <RaceActions race={race} />
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
