import Flag from "react-world-flags";
import { Location } from "@/lib/types/RaceTypes";

type Props = {
  location: Location;
  showFlag?: boolean;
  version?: "short" | "long";
};

export default function RenderRaceLocation({
  location,
  showFlag = true,
  version = "short",
}: Props) {
  return (
    <div className="text-muted-foreground text-sm flex items-center gap-2 mt-1.5">
      {showFlag && (
        <Flag
          code={location.country.code}
          className="w-5 max-h-4 rounded-[0.15rem] object-cover"
        />
      )}

      {location.circuit.name}
      {version === "long" && " - " + location.circuit.nameLong}
    </div>
  );
}
