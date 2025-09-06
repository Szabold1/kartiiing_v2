import Flag from "react-world-flags";
import { Location } from "@/lib/types/RaceTypes";
import { ExternalLink } from "lucide-react";

type Props = {
  location: Location;
  showFlag?: boolean;
  version?: "short" | "long";
  className?: string;
  isClickable?: boolean;
};

export default function RenderRaceLocation({
  location,
  showFlag = true,
  version = "short",
  className = "",
  isClickable = false,
}: Props) {
  const handleClick = () => {
    if (!isClickable) return;
    const searchQuery = encodeURIComponent(location.circuit.nameLong);
    const mapUrl = `https://www.google.com/maps/search/${searchQuery}`;
    window.open(mapUrl, "_blank");
  };

  return (
    <div
      className={`flex items-center gap-2 w-fit ${
        isClickable ? "cursor-pointer hover:opacity-75 transition-opacity" : ""
      } ${className}`}
      onClick={handleClick}
    >
      {showFlag && (
        <Flag
          code={location.country.code}
          className="w-5 max-h-4 rounded-[0.15rem] object-cover shadow"
        />
      )}

      {version === "short" && location.circuit.name}
      {version === "long" && location.circuit.nameLong}

      {isClickable && <ExternalLink className="w-3 h-3 opacity-75" />}
    </div>
  );
}
