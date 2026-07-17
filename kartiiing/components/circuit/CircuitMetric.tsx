import { Ruler, Route } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserLocationStore } from '@/lib/stores/userLocationStore';
import type { ICircuitLayout } from '@kartiiing/shared';

type MetricType = 'length' | 'distance';

type Props = {
  value: number;
  type: MetricType;
  className?: string;
  layouts?: ICircuitLayout[];
};

const ICON_MAP: Record<MetricType, typeof Ruler> = {
  length: Ruler,
  distance: Route,
};

function getTooltip(type: MetricType, locationName?: string): string {
  if (type === 'distance') {
    return locationName
      ? `Approximate straight-line distance from ${locationName}`
      : 'Approximate straight-line distance from your location';
  }
  return 'Circuit length';
}

function formatValue(
  value: number,
  type: MetricType,
  layouts?: ICircuitLayout[],
): string {
  if (type === 'distance') {
    return Math.round(value) + ' km';
  }

  if (layouts && layouts.length > 1) {
    const lengths = layouts.map((l) => l.length);
    const min = Math.min(...lengths);
    const max = Math.max(...lengths);

    if (min !== max) {
      return `${min} - ${max} m`;
    }
  }

  return `${value} m`;
}

export function CircuitMetric({ value, type, className, layouts }: Props) {
  const locationName = useUserLocationStore((state) => state.locationName);

  if (value == null || value <= 0) return null;

  const Icon = ICON_MAP[type];
  const tooltip = getTooltip(type, locationName);

  const content = (
    <span
      className={cn(
        'text-muted-foreground flex items-center gap-1.5 text-sm',
        className,
      )}
    >
      <Icon size={14} />
      {formatValue(value, type, layouts)}
    </span>
  );

  if (type === 'distance') {
    return <span title={tooltip}>{content}</span>;
  }

  return content;
}
