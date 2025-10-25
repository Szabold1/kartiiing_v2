import { IRaceEvent } from "@kartiiing/shared-types";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  race: IRaceEvent;
};

export default function Results({ race }: Props) {
  const resultsLinks = race.links?.results || [];

  return (
    <div className="flex flex-wrap gap-2.5">
      {resultsLinks.map((result, index) => (
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
