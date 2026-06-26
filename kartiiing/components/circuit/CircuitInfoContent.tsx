import { ICircuit } from "@kartiiing/shared";
import CircuitActionLinks from "@/components/circuit/CircuitActionLinks";
import RaceLocation from "@/components/shared/race-data/RaceLocation";
import { getCircuitLengthDisplay } from "@/lib/utils/circuitUtils";

type Props = {
  circuit: ICircuit;
  showActions?: boolean;
};

export default function CircuitInfoContent({
  circuit,
  showActions = true,
}: Props) {
  return (
    <div className="flex justify-between items-center flex-1">
      <div className="flex flex-col min-w-0 flex-1">
        <RaceLocation
          circuit={circuit}
          className="text-muted-foreground text-sm font-medium"
        />
        <h3 className="font-semibold tracking-tight truncate">
          {circuit.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {getCircuitLengthDisplay(circuit)}
        </p>
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
