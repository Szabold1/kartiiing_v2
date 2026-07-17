import { cn } from '@/lib/utils';

type Props = {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
};

export function RaceActionBtn({
  onClick,
  className = '',
  children = 'Live Action',
  ariaLabel,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-10.5 w-10.5 cursor-pointer items-center justify-center rounded-lg p-2 transition-colors duration-200',
        className,
      )}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
