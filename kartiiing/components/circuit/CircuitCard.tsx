import { ICircuit } from '@kartiiing/shared';
import { CircuitActionLinks } from '@/components/circuit/CircuitActionLinks';
import { CircuitInfoContent } from '@/components/circuit/CircuitInfoContent';
import { RaceLocation } from '@/components/shared/race-data/RaceLocation';
import { CircuitMetric } from '@/components/circuit/CircuitMetric';
import { cn, lightDarkGlassHover } from '@/lib/utils';

type Props = {
  circuit: ICircuit;
  variant?: 'card' | 'row';
  headingLevel?: 'h2' | 'h3';
};

export function CircuitCard({
  circuit,
  variant = 'card',
  headingLevel = 'h3',
}: Props) {
  const HeadingTag = headingLevel === 'h2' ? 'h2' : 'h3';

  if (variant === 'row') {
    const showDistance = circuit.distance != null;

    return (
      <article
        className={cn(
          'flex min-h-[3.3rem] cursor-pointer overflow-hidden rounded-2xl p-[0.4rem]',
          lightDarkGlassHover,
          'border-transparent shadow-none dark:border-transparent dark:bg-transparent',
        )}
      >
        <div className="flex flex-1 items-center gap-4 pl-3.5">
          <RaceLocation
            circuit={circuit}
            className="text-muted-foreground max-w-[8.5rem] min-w-[8.5rem] text-sm font-medium"
          />
          <HeadingTag className="flex-1 truncate font-semibold">
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
            className="flex min-w-[5.5rem] justify-end gap-1.5"
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        'flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl p-3.5',
        lightDarkGlassHover,
      )}
    >
      <CircuitInfoContent circuit={circuit} headingLevel={headingLevel} />
    </article>
  );
}
