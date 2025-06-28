import { ChevronsDown } from "lucide-react";
import { toDay } from "@/lib/utils";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { Button } from "@/components/ui/button";

type Props = {
  races: RaceEventGrouped[];
};

export default function NextRaceBtn({ races }: Props) {
  function handleClick() {
    const futureRaces = races.filter(
      (r) => toDay(r.date.end) > toDay(new Date())
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
      <span className="pl-1.5">Next race</span>
      <ChevronsDown className="w-4 h-4" />
    </Button>
  );
}
