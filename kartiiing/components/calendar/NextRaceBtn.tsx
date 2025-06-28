import { ChevronsDown } from "lucide-react";
import { toDay } from "@/lib/utils";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";

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
    <button
      className="text-xs text-white uppercase py-2 md:py-2.5 px-2 md:px-3 bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600 rounded-md flex items-center transition cursor-pointer shadow-sm"
      onClick={handleClick}
    >
      <span className="px-1 md:px-1.5">Next race</span>
      <ChevronsDown className="w-4 h-4" />
    </button>
  );
}
