import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { useRaceStatus } from "@/hooks/useRaceStatus";
import { useRaceContext } from "@/contexts/RaceContext";
import StatusBadge from "./StatusBadge";
import LiveActionButton from "./LiveActionButton";
import { Timer, TvMinimalPlay } from "lucide-react";

type Props = {
  race: RaceEventGrouped;
};

export default function LiveActions({ race }: Props) {
  const { races } = useRaceContext();
  const { getRaceStatusForRace } = useRaceStatus(races);
  const status = getRaceStatusForRace(race);
  if (status !== "Live") return null;

  const raceName = `${race.championship.nameLong} ${race.championship.nameSeries}`;

  const handleClick = (type: "timing" | "streaming") => {
    const searchQuery = encodeURIComponent(`${raceName} live ${type}`);
    const searchUrl = `https://www.google.com/search?q=${searchQuery}`;
    window.open(searchUrl, "_blank");
  };

  return (
    <div className="absolute -top-5.5 left-5.5 flex items-center gap-1">
      <StatusBadge
        status={status}
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
