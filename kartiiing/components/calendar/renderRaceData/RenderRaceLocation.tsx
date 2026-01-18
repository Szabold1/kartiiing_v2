import Flag from "react-world-flags";
import { ICircuit, ICircuitDetail } from "@kartiiing/shared-types";
import { ExternalLink } from "lucide-react";
import { flagIconBase } from "@/lib/classNames";

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
  const mapUrl = `https://maps.google.com/?q=${circuit.latitude},${circuit.longitude}`;

  const baseClassName = `flex items-center gap-2 w-fit ${
    isClickable ? "cursor-pointer hover:opacity-75 transition-opacity" : ""
  } ${className}`;

  const content = (
    <>
      {showFlag && (
        <Flag code={circuit.country.code} className={flagIconBase} />
      )}

      {version === "short" && circuit.nameShort}
      {version === "long" &&
        ("nameLong" in circuit ? circuit.nameLong : circuit.nameShort)}

      {isClickable && <ExternalLink className="w-3 h-3 opacity-75" />}
    </>
  );

  if (isClickable) {
    return (
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClassName}
      >
        {content}
      </a>
    );
  }

  return <div className={baseClassName}>{content}</div>;
}
