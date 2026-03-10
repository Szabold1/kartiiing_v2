import { IRaceEventDetail } from "@kartiiing/shared-types";
import RaceDetailsHeader from "@/components/race/RaceDetailsHeader";
import RaceDetailsGrid from "@/components/race/RaceDetailsGrid";

type Props = {
  race: IRaceEventDetail;
};

export default function RaceDetails({ race }: Props) {
  return (
    <div className="container relative flex-1 mx-auto lg:px-10 sm:px-5 md:px-6">
      <RaceDetailsHeader race={race} />
      <RaceDetailsGrid race={race} />
    </div>
  );
}
