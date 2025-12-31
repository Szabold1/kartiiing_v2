"use client";

import { IRaceEvent } from "@kartiiing/shared-types";
import RenderRaceTitle from "@/components/calendar/renderRaceData/RenderRaceTitle";
import Tabs from "@/components/Tabs";
import { X } from "lucide-react";
import RaceSummary from "@/components/calendar/tabs/RaceSummary";
import Results from "@/components/calendar/tabs/Results";
import LiveActions from "./LiveActions";

type Props = {
  race: IRaceEvent;
  onClose?: () => void;
};

export default function RaceDetails({ race, onClose }: Props) {
  const resultsLinks = race.links?.results || [];

  const tabs = [
    {
      id: "summary",
      label: "Summary",
      content: <RaceSummary race={race} />,
    },
    ...(resultsLinks && resultsLinks.length > 0
      ? [
          resultsLinks.length === 1
            ? {
                id: "results",
                label: "Results",
                content: null,
                onClick: () => window.open(resultsLinks[0].url, "_blank"),
              }
            : {
                id: "results",
                label: "Results",
                content: <Results race={race} />,
              },
        ]
      : []),
  ];

  return (
    <div className="p-4 sm:p-5 h-full relative min-h-90">
      <div className="flex items-center mb-4 gap-2">
        <RenderRaceTitle
          championship={race.championships[0]}
          className="text-xl font-semibold tracking-tight"
        />
        <LiveActions race={race} />
        {onClose && (
          <X
            className="w-8 h-8 p-2 border rounded-sm cursor-pointer text-zinc-600 dark:text-zinc-300 hover:bg-accent ml-auto flex-shrink-0"
            onClick={onClose}
          />
        )}
      </div>

      <Tabs tabs={tabs} defaultTab="summary" />
    </div>
  );
}
