import Flag from "react-world-flags";
import { ICircuit, ICircuitDetail } from "@kartiiing/shared-types";
import { ExternalLink } from "lucide-react";

type Props = {
  circuit: ICircuit | ICircuitDetail;
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
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${circuit.latitude},${circuit.longitude}`;
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
      {version === "long" &&
        ("nameLong" in circuit ? circuit.nameLong : circuit.nameShort)}

      {isClickable && <ExternalLink className="w-3 h-3 opacity-75" />}
    </div>
  );
}
