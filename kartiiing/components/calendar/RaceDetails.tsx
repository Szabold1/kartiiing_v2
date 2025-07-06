import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import RenderRaceTitle from "@/components/calendar/renderRaceData/RenderRaceTitle";
import Tabs from "@/components/Tabs";
import { X } from "lucide-react";
import RaceSummary from "@/components/calendar/tabs/RaceSummary";
import LiveActions from "./LiveActions";

type Props = {
  race: RaceEventGrouped;
  upcomingDate: Date | null;
  onClose?: () => void;
};

export default function RaceDetails({ race, upcomingDate, onClose }: Props) {
  const tabs = [
    {
      id: "summary",
      label: "Summary",
      content: <RaceSummary race={race} />,
    },
    ...(race.resultsLinks && race.resultsLinks.length > 0
      ? [
          {
            id: "results",
            label: "Results",
            content: (
              <div className="flex items-center justify-center text-muted-foreground">
                Results content coming soon...
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="p-4 h-full relative min-h-90">
      <div className="flex items-center mb-4 gap-2">
        <RenderRaceTitle
          championship={race.championship}
          className="text-lg font-semibold tracking-tight"
        />
        <LiveActions race={race} upcomingDate={upcomingDate} />
        <X
          className="w-8 h-8 p-2 border rounded-sm cursor-pointer text-zinc-600 dark:text-zinc-300 hover:bg-accent ml-auto flex-shrink-0"
          onClick={onClose}
        />
      </div>

      <Tabs tabs={tabs} defaultTab="summary" />
    </div>
  );
}
