import { useEffect, useState } from "react";
import { ChevronsDown } from "lucide-react";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { Button } from "@/components/ui/button";
import { useRaceStatus } from "@/hooks/useRaceStatus";
import { toDay } from "@/lib/utils";
import { redGlassHover } from "@/lib/classNames";

type Props = {
  races: RaceEventGrouped[];
};

export default function NextRaceBtn({ races }: Props) {
  const [label, setLabel] = useState("Next race");
  const { liveRaces, nextRaces } = useRaceStatus(races);

  useEffect(() => {
    if (liveRaces.length === 1) setLabel("Race now");
    else if (liveRaces.length > 1) setLabel("Races now");
    else if (nextRaces.length > 1) setLabel("Next races");
    else setLabel("Next race");
  }, [liveRaces, nextRaces]);

  function handleClick() {
    const targetRace =
      liveRaces.length > 0
        ? liveRaces[0]
        : nextRaces.length > 0
        ? nextRaces[0]
        : null;

    if (!targetRace) return;

    const id = `${toDay(targetRace.date.end)}-${
      targetRace.location.circuit.name
    }-${targetRace.championship.name}`;

    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <Button
      className={`uppercase text-xs h-9 font-medium text-center tracking-wide ${redGlassHover}`}
      onClick={handleClick}
    >
      <span className="pl-1.5">{label}</span>
      <ChevronsDown className="w-4 h-4" />
    </Button>
  );
}
