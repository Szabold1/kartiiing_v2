import { useEffect, useState } from "react";
import { ChevronsDown } from "lucide-react";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { Button } from "@/components/ui/button";
import { useRaceStatus } from "@/hooks/useRaceStatus";
import { toDay } from "@/lib/utils";

type Props = {
  races: RaceEventGrouped[];
};

export default function NextRaceBtn({ races }: Props) {
  const [label, setLabel] = useState("Next race");
  const { liveRaces, upcomingRaces } = useRaceStatus(races);

  useEffect(() => {
    if (liveRaces.length === 1) setLabel("Race now");
    else if (liveRaces.length > 1) setLabel("Races now");
    else if (upcomingRaces.length > 1) setLabel("Next races");
    else setLabel("Next race");
  }, [liveRaces, upcomingRaces]);

  function handleClick() {
    const targetRace =
      liveRaces.length > 0
        ? liveRaces[0]
        : upcomingRaces.length > 0
        ? upcomingRaces[0]
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
      className="uppercase text-xs text-white bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600"
      onClick={handleClick}
    >
      <span className="pl-1.5">{label}</span>
      <ChevronsDown className="w-4 h-4" />
    </Button>
  );
}
