import { cn } from '@/lib/utils';

type Props = {
  children?: React.ReactNode;
  position: 'left' | 'right';
  visibilityFrom: 'lg' | 'xl';
  className?: string;
};

export function Aside({
  children,
  position,
  visibilityFrom,
  className = '',
}: Props) {
  const borderClass = position === 'left' ? 'border-r' : 'border-l';
  const visibilityClass = visibilityFrom === 'lg' ? 'lg:block' : 'xl:block';

  return (
    <aside
      className={cn(
        'z-30 hidden w-3xs shrink-0 border-dashed py-3',
        visibilityClass,
        borderClass,
        className,
      )}
    >
      {children}
    </aside>
  );
}
