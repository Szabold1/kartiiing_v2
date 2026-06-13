import { Globe, MapPin } from "lucide-react";
import { ICircuitDetail } from "@kartiiing/shared";
import RaceLocation from "@/components/shared/race-data/RaceLocation";
import { cn, getGoogleMapsUrl, grayGlassHover } from "@/lib/utils";

type Props = {
  circuit: ICircuitDetail;
};

export default function CircuitInfoContent({ circuit }: Props) {
  const btnStyles = cn(
    grayGlassHover,
    "flex w-10 h-10 items-center justify-center rounded-lg",
  );
  const googleMapsUrl = getGoogleMapsUrl(circuit.coordinates);

  return (
    <div className="flex justify-between items-center">
      <div className="p-1.5 flex flex-col gap-0.5">
        <RaceLocation circuit={circuit} />
        <h3 className="text-lg font-semibold leading-tight">{circuit.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {circuit.layout?.name && <>{circuit.layout.name} • </>}
          {circuit.length > 0 ? `${circuit.length} meters` : "Unknown length"}
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        {circuit.website && (
          <a
            href={circuit.website}
            target="_blank"
            rel="noopener noreferrer"
            className={btnStyles}
            title="Visit circuit website"
          >
            <Globe className="w-5 h-5" />
          </a>
        )}
        {googleMapsUrl && (
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={btnStyles}
            title="Open in Google Maps"
          >
            <MapPin className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}
