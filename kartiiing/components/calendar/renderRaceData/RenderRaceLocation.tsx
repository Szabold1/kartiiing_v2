import Flag from "react-world-flags";
import { ICircuit } from "@kartiiing/shared-types";
import { ExternalLink } from "lucide-react";

type Props = {
  circuit: ICircuit;
  showFlag?: boolean;
  version?: "short" | "long";
  className?: string;
  isClickable?: boolean;
};

export default function RenderRaceLocation({
  circuit,
  showFlag = true,
  version = "short",
  className = "",
  isClickable = false,
}: Props) {
  const handleClick = () => {
    if (!isClickable) return;
    const searchQuery = encodeURIComponent(circuit.nameLong);
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
          code={circuit.country.code}
          className="w-5 max-h-4 rounded-[0.15rem] object-cover shadow"
        />
      )}

      {version === "short" && circuit.nameShort}
      {version === "long" && circuit.nameLong}

      {isClickable && <ExternalLink className="w-3 h-3 opacity-75" />}
    </div>
  );
}
