import { IRaceEvent } from "@kartiiing/shared-types";
import StatusResultsBadge from "./StatusResultsBadge";
import LiveActionButton from "./LiveActionButton";
import { Timer, TvMinimalPlay } from "lucide-react";
import { RaceStatus } from "@kartiiing/shared-types";

type Props = {
  race: IRaceEvent;
};

export default function LiveActions({ race }: Props) {
  if (race.status !== RaceStatus.LIVE) return null;

  const championship = race.championships[0];

  const handleClick = (type: "timing" | "streaming") => {
    const searchQuery = encodeURIComponent(`${championship.title} live ${type}`);
    const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
    window.open(searchUrl, "_blank");
  };

  return (
    <div className="absolute -top-5.5 left-5.5 flex items-center gap-1">
      <StatusResultsBadge
        race={race}
        className="px-3.5 py-2 rounded-lg font-medium border border-dashed"
      />

      <LiveActionButton onClick={() => handleClick("timing")}>
        <Timer className="w-4 h-4" />
      </LiveActionButton>

      <LiveActionButton onClick={() => handleClick("streaming")}>
        <TvMinimalPlay className="w-4 h-4" />
      </LiveActionButton>
    </div>
  );
}
