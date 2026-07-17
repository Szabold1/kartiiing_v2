'use client';

import { cn, noBlurGlassBase } from '@/lib/utils';

type Props = {
  className?: string;
};

export function MapNoResults({ className = '' }: Props) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-10 flex items-center justify-center',
        className,
      )}
    >
      <div className={cn('rounded-lg px-4 py-2', noBlurGlassBase)}>
        <p className="text-muted-foreground text-sm font-medium">
          No circuits match your search
        </p>
      </div>
    </div>
  );
}
