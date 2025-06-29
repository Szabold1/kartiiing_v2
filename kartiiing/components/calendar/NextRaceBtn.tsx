import { useEffect, useMemo, useState } from "react";
import { ChevronsDown } from "lucide-react";
import { getNextUpcomingRaceDate, toDay } from "@/lib/utils";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { Button } from "@/components/ui/button";
import { getRaceStatus } from "@/lib/utils";

type Props = {
  races: RaceEventGrouped[];
};

export default function NextRaceBtn({ races }: Props) {
  const [label, setLabel] = useState("Next race");
  const upcomingDate = useMemo(() => getNextUpcomingRaceDate(races), [races]);
  const liveRaces = useMemo(
    () =>
      races.filter((race) => {
        const status = getRaceStatus(
          new Date(race.date.start),
          new Date(race.date.end),
          upcomingDate
        );
        return status === "Live";
      }),
    [races, upcomingDate]
  );

  useEffect(() => {
    if (liveRaces.length === 1) setLabel("Race now");
    else if (liveRaces.length > 1) setLabel("Races now");
    else setLabel("Next race");
  }, [liveRaces]);

  function handleClick() {
    const futureRaces = races.filter(
      (r) => toDay(r.date.end) >= toDay(new Date())
    );
    if (futureRaces.length > 0) {
      document
        .getElementById(
          `${futureRaces[0].date.end}-${futureRaces[0].location.circuit.name}-${futureRaces[0].championship.name}`
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
