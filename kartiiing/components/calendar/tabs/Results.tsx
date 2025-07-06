import { RaceEventGrouped } from "@/lib/types/RaceTypes";
import { ExternalLink } from "lucide-react";
import { sortCategoriesByOrder } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  race: RaceEventGrouped;
};

export default function Results({ race }: Props) {
  const resultsLinks = race.resultsLinks || [];
  const sortedResultsLinks = sortCategoriesByOrder(
    resultsLinks,
    (result) => result.category
  );

  return (
    <div className="flex flex-wrap gap-2.5">
      {sortedResultsLinks.map((result, index) => (
        <Button
          key={index}
          className="uppercase"
          onClick={() => window.open(result.url, "_blank")}
        >
          <span className="pl-0">{result.category}</span>
          <ExternalLink className="!w-3 !h-3 opacity-75" />
        </Button>
      ))}
    </div>
  );
}
