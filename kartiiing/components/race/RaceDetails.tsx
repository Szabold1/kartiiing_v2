import { IRaceEventDetail } from '@kartiiing/shared';
import { RaceDetailsHeader } from '@/components/race/RaceDetailsHeader';
import { RaceDetailsGrid } from '@/components/race/RaceDetailsGrid';

type Props = {
  race: IRaceEventDetail;
};

export function RaceDetails({ race }: Props) {
  return (
    <article className="relative container mx-auto flex-1 sm:px-5 md:px-6 lg:px-10">
      <RaceDetailsHeader race={race} />
      <RaceDetailsGrid race={race} />
    </article>
  );
}
