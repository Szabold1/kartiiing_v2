import { Globe, MapPin } from "lucide-react";
import { ICircuit } from "@kartiiing/shared";
import CircuitActionLink from "@/components/circuit/CircuitActionLink";
import { getGoogleMapsUrl } from "@/lib/utils";

type Props = {
  circuit: ICircuit;
  className?: string;
};

export default function CircuitActionLinks({ circuit, className }: Props) {
  const googleMapsUrl = getGoogleMapsUrl(circuit.coordinates);

  return (
    <div className={className}>
      <CircuitActionLink
        href={circuit.website}
        title="Visit circuit website"
        icon={<Globe className="w-5 h-5" />}
      />
      <CircuitActionLink
        href={googleMapsUrl}
        title="Open in Google Maps"
        icon={<MapPin className="w-5 h-5" />}
      />
    </div>
  );
}
