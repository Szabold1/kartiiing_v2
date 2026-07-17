import { Globe, MapPin } from 'lucide-react';
import { ICircuit } from '@kartiiing/shared';
import { CircuitActionLink } from '@/components/circuit/CircuitActionLink';
import { getGoogleMapsUrl } from '@/lib/utils';

type Props = {
  circuit: ICircuit;
  className?: string;
};

export function CircuitActionLinks({ circuit, className }: Props) {
  const googleMapsUrl = getGoogleMapsUrl(circuit.coordinates);

  return (
    <div className={className}>
      <CircuitActionLink
        href={circuit.website}
        title="Visit circuit website"
        icon={<Globe className="h-5 w-5" />}
      />
      <CircuitActionLink
        href={googleMapsUrl}
        title="Open in Google Maps"
        icon={<MapPin className="h-5 w-5" />}
      />
    </div>
  );
}
