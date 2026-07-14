import { ICircuit } from "@kartiiing/shared";
import { CircuitActionLinks } from "@/components/circuit/CircuitActionLinks";
import { RaceLocation } from "@/components/shared/race-data/RaceLocation";
import { CircuitMetric } from "@/components/shared/badges/CircuitMetricBadge";

type Props = {
  circuit: ICircuit;
  showActions?: boolean;
  headingLevel?: "h2" | "h3";
};

export function CircuitInfoContent({
  circuit,
  showActions = true,
  headingLevel = "h3",
}: Props) {
  const showDistance = circuit.distance != null;
  const HeadingTag = headingLevel === "h2" ? "h2" : "h3";

  return (
    <div className="flex justify-between items-center flex-1">
      <div className="flex flex-col min-w-0 flex-1">
        <RaceLocation
          circuit={circuit}
          className="text-muted-foreground text-sm font-medium"
        />
        <HeadingTag className="font-semibold tracking-tight truncate">
          {circuit.name}
        </HeadingTag>
        {showDistance ? (
          <CircuitMetric value={circuit.distance!} type="distance" />
        ) : (
          <CircuitMetric value={circuit.length} type="length" />
        )}
      </div>
      {showActions && (
        <CircuitActionLinks
          circuit={circuit}
          className="flex flex-col gap-1.5 pl-1.5"
        />
      )}
    </div>
  );
}
