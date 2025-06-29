import { Championship } from "@/lib/types/RaceTypes";

type Props = {
  championship: Championship;
  className?: string;
};

export default function RenderRaceTitle({ championship, className }: Props) {
  return (
    <div className={className}>
      {championship.name ? championship.name : championship.nameLong}
      {championship.nameSeries ? ` ${championship.nameSeries}` : ""}
      {championship.roundNumber ? ` #${championship.roundNumber}` : ""}
    </div>
  );
}
