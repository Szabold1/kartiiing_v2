import { IChampionship } from "@kartiiing/shared-types";

type Props = {
  championship: IChampionship;
  roundNumber?: number;
  className?: string;
};

export default function RenderRaceTitle({
  championship,
  roundNumber,
  className,
}: Props) {
  return (
    <div className={className}>
      {championship.nameShort ? championship.nameShort : championship.nameLong}
      {championship.nameSeries ? ` ${championship.nameSeries}` : ""}
      {roundNumber ? ` #${roundNumber}` : ""}
    </div>
  );
}
