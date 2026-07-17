import Link from 'next/link';
import { EngineCategory } from '@/components/shared/race-data/EngineCategory';
import { StatusResultsBadge } from '@/components/shared/badges/StatusResultsBadge';
import { IRaceEvent, RaceStatus } from '@kartiiing/shared';
import { RaceDate } from '@/components/shared/race-data/RaceDate';
import { RaceLocation } from '@/components/shared/race-data/RaceLocation';
import {
  cn,
  getRaceUrl,
  lightDarkGlassHover,
  liveContainerHover,
} from '@/lib/utils';

type Props = {
  race: IRaceEvent;
  variant?: 'card' | 'row';
  headingLevel?: 'h2' | 'h3';
};

export function RaceCard({
  race,
  variant = 'card',
  headingLevel = 'h3',
}: Props) {
  const { id, date, circuit, categories } = race;
  const hasResults = race.links?.results && race.links.results.length > 0;
  const addDatePadding = variant === 'row' && !race.status && !hasResults;
  const HeadingTag = headingLevel === 'h2' ? 'h2' : 'h3';
  const href = getRaceUrl(race);
  const ariaLabel = `View details for ${race.title} at ${circuit?.locationName} - ${date.end}`;

  if (variant === 'row') {
    return (
      <article id={`${id}`}>
        <Link
          href={href}
          aria-label={ariaLabel}
          className={cn(
            'flex min-h-[3.3rem] cursor-pointer overflow-hidden rounded-2xl p-[0.4rem]',
            lightDarkGlassHover,
            race.status === RaceStatus.LIVE
              ? liveContainerHover
              : 'border-transparent shadow-none dark:border-transparent dark:bg-transparent',
          )}
        >
          <div className="flex flex-1 items-center gap-4">
            {race.status || hasResults ? (
              <span
                className={cn(
                  addDatePadding ? 'min-w-[6.6rem]' : 'min-w-[6.5rem]',
                )}
              >
                <StatusResultsBadge
                  race={race}
                  className="rounded-lg px-3"
                  heightValue="9.5"
                />
              </span>
            ) : null}
            <RaceDate
              date={date}
              className={cn(
                'text-muted-foreground min-w-[7rem] text-sm tracking-tight',
                addDatePadding && 'pl-2',
              )}
            />
            <RaceLocation
              circuit={circuit}
              className="text-muted-foreground max-w-[8.5rem] min-w-[8.5rem] text-sm font-medium"
            />
            <HeadingTag className="flex-1 truncate font-semibold">
              {race.title}
            </HeadingTag>
            <EngineCategory
              engineCategoryPairs={categories}
              className="ml-auto"
              badgeClassName="px-2.5 py-2 xl:px-3"
            />
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article id={`${id}`}>
      <Link
        href={href}
        aria-label={ariaLabel}
        className={cn(
          'relative flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl p-3.5 md:max-w-md',
          lightDarkGlassHover,
          race.status === RaceStatus.LIVE && liveContainerHover,
        )}
      >
        {race.status || hasResults ? (
          <div className="absolute -top-0.5 -right-0.5">
            <StatusResultsBadge
              race={race}
              className="rounded-bl-2xl pr-3.5 pl-4"
            />
          </div>
        ) : null}
        <RaceDate
          date={date}
          className="text-muted-foreground leading-tight tracking-tighter"
        />
        <RaceLocation
          circuit={circuit}
          className="text-muted-foreground mt-1.5 text-sm font-medium"
        />
        <HeadingTag className="flex-1 font-semibold tracking-tight">
          {race.title}
        </HeadingTag>
        <EngineCategory engineCategoryPairs={categories} className="mt-2" />
      </Link>
    </article>
  );
}
