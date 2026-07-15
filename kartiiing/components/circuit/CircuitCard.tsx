import { ICircuit } from "@kartiiing/shared";
import { CircuitActionLinks } from "@/components/circuit/CircuitActionLinks";
import { CircuitInfoContent } from "@/components/circuit/CircuitInfoContent";
import { RaceLocation } from "@/components/shared/race-data/RaceLocation";
import { CircuitMetric } from "@/components/circuit/CircuitMetric";
import { cn, lightDarkGlassHover } from "@/lib/utils";

type Props = {
  circuit: ICircuit;
  variant?: "card" | "row";
  headingLevel?: "h2" | "h3";
};

export function CircuitCard({
  circuit,
  variant = "card",
  headingLevel = "h3",
}: Props) {
  const HeadingTag = headingLevel === "h2" ? "h2" : "h3";

  if (variant === "row") {
    const showDistance = circuit.distance != null;

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
          <HeadingTag className="font-semibold truncate flex-1">
            {circuit.name}
          </HeadingTag>
          {showDistance ? (
            <CircuitMetric value={circuit.distance!} type="distance" />
          ) : (
            <CircuitMetric
              value={circuit.length}
              type="length"
              layouts={circuit.layouts}
            />
          )}
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
      <CircuitInfoContent circuit={circuit} headingLevel={headingLevel} />
    </article>
  );
}
