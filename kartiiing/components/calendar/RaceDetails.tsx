import { RaceEventGrouped } from "@/lib/types/RaceTypes";

type Props = {
  race: RaceEventGrouped;
};

export default function RaceDetails({ race }: Props) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{race.championship.name}</h2>

      <div className="mb-2">
        <span className="font-semibold">Location:</span>{" "}
        {race.location.circuit.name}
      </div>

      <div className="mb-2">
        <span className="font-semibold">Start:</span> {race.date.start}
      </div>

      <div className="mb-2">
        <span className="font-semibold">End:</span> {race.date.end}
      </div>
    </div>
  );
}
