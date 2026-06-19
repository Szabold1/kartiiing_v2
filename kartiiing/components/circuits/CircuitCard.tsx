import { ICircuit } from "@kartiiing/shared";
import CircuitActionLinks from "@/components/circuit/CircuitActionLinks";
import CircuitInfoContent from "@/components/circuit/CircuitInfoContent";
import RaceLocation from "@/components/shared/race-data/RaceLocation";
import { cn, lightDarkGlassHover } from "@/lib/utils";
import { getCircuitLengthDisplay } from "@/lib/utils/circuitUtils";

type Props = {
  circuit: ICircuit;
  variant?: "card" | "row";
};

export default function CircuitCard({ circuit, variant = "card" }: Props) {
  if (variant === "row") {
    return (
      <article
        className={cn(
          "min-h-[3.3rem] p-[0.4rem] flex cursor-pointer overflow-hidden rounded-2xl",
          lightDarkGlassHover,
          "border-transparent dark:border-transparent dark:bg-transparent shadow-none",
        )}
      >
        <div className="flex-1 flex items-center gap-4 pl-3.5">
          <RaceLocation
            circuit={circuit}
            className="text-sm font-medium min-w-[8.5rem] max-w-[8.5rem] text-muted-foreground"
          />
          <h3 className="font-semibold truncate flex-1">{circuit.name}</h3>
          <span className="text-sm text-muted-foreground min-w-[5rem]">
            {getCircuitLengthDisplay(circuit)}
          </span>
          <CircuitActionLinks
            circuit={circuit}
            className="flex gap-1.5 min-w-[5.5rem] justify-end"
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "p-3.5 flex flex-col overflow-hidden rounded-2xl w-full cursor-pointer",
        lightDarkGlassHover,
      )}
    >
      <CircuitInfoContent circuit={circuit} />
    </article>
  );
}
