import { Button } from '@/components/ui/button';
import { cn, lightDarkGlassActive, lightDarkGlassBase } from '@/lib/utils';

interface Option<T extends string> {
  value: T;
  icon: React.ReactNode;
  label: string;
}

type Props<T extends string> = {
  viewMode: T;
  setViewMode: (mode: T) => void;
  options: readonly Option<T>[];
  className?: string;
};

export function GridViewToggle<T extends string>({
  viewMode,
  setViewMode,
  options,
  className = '',
}: Props<T>) {
  return (
    <div
      className={cn(
        'flex h-10.5 items-center justify-center rounded-lg p-[0.1rem]',
        lightDarkGlassBase,
        className,
      )}
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant="outline"
          aria-label={opt.label}
          className={cn(
            'h-[2.33rem] w-[2.33rem] rounded-[0.55rem] border-transparent shadow-none dark:bg-transparent',
            viewMode === opt.value
              ? lightDarkGlassActive
              : 'opacity-60 hover:opacity-100',
          )}
          onClick={() => setViewMode(opt.value)}
        >
          {opt.icon}
        </Button>
      ))}
    </div>
  );
}
