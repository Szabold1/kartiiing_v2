import { useEffect, useState } from "react";
import { ChevronsDown } from "lucide-react";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { Button } from "@/components/ui/button";
import { useRaceStatus } from "@/hooks/useRaceStatus";

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
    if (upcomingRaces.length > 0) {
      document
        .getElementById(
          `${upcomingRaces[0].date.end}-${upcomingRaces[0].location.circuit.name}-${upcomingRaces[0].championship.name}`
        )
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
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
