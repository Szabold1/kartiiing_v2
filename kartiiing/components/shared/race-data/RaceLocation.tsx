import Flag from "react-world-flags";
import { ICircuit, ICircuitDetail } from "@kartiiing/shared";
import { ExternalLink } from "lucide-react";
import { cn, flagIconBase, getGoogleMapsUrl } from "@/lib/utils";

type Props = {
  circuit: ICircuit | ICircuitDetail;
  showFlag?: boolean;
  version?: "locationName" | "circuitName";
  className?: string;
  isClickable?: boolean;
};

export default function RaceLocation({
  circuit,
  showFlag = true,
  version = "locationName",
  className = "",
  isClickable = false,
}: Props) {
  const mapUrl = getGoogleMapsUrl(circuit.coordinates);

  const baseClassName = cn(
    "flex items-center gap-2 w-fit",
    isClickable && "cursor-pointer hover:opacity-75 transition-opacity",
    className,
  );

  const content = (
    <>
      {showFlag && (
        <Flag
          code={circuit.country.code}
          className={flagIconBase}
          alt={`${circuit.country.name} flag`}
          title={circuit.country.name}
        />
      )}

      {version === "locationName" && circuit.locationName}
      {version === "circuitName" &&
        (circuit.name ? circuit.name : circuit.locationName)}

      {isClickable && (
        <ExternalLink className="w-3 h-3 opacity-75" aria-hidden="true" />
      )}
    </>
  );

  if (isClickable && mapUrl) {
    return (
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClassName}
        aria-label={`View ${circuit.locationName} on Google Maps`}
      >
        {content}
      </a>
    );
  }

  return <div className={baseClassName}>{content}</div>;
}
