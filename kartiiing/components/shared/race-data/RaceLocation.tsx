import Flag from 'react-world-flags';
import { ICircuit, ICircuitDetail } from '@kartiiing/shared';
import { ExternalLink } from 'lucide-react';
import { cn, flagIconBase, getGoogleMapsUrl } from '@/lib/utils';

type Props = {
  circuit: ICircuit | ICircuitDetail;
  showFlag?: boolean;
  version?: 'locationName' | 'circuitName';
  className?: string;
  isClickable?: boolean;
};

export function RaceLocation({
  circuit,
  showFlag = true,
  version = 'locationName',
  className = '',
  isClickable = false,
}: Props) {
  const mapUrl = getGoogleMapsUrl(circuit.coordinates);

  const baseClassName = cn(
    'flex w-fit items-center gap-2',
    isClickable && 'cursor-pointer transition-opacity hover:opacity-75',
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

      {version === 'locationName' && circuit.locationName}
      {version === 'circuitName' &&
        (circuit.name ? circuit.name : circuit.locationName)}

      {isClickable && (
        <ExternalLink className="h-3 w-3 opacity-75" aria-hidden="true" />
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
