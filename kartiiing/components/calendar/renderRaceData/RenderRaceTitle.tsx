import { IChampionship } from "@kartiiing/shared-types";

type Props = {
  championship: IChampionship;
  className?: string;
};

export default function RenderRaceTitle({ championship, className }: Props) {
  return <div className={className}>{championship.title}</div>;
}
