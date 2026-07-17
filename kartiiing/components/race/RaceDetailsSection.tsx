import { SectionTitle } from '@/components/shared/SectionTitle';
import { cn, lightDarkGlassBase } from '@/lib/utils';

type Props = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function RaceDetailsSection({ title, children, className = '' }: Props) {
  return (
    <section>
      <SectionTitle
        className="px-4 pb-2.5 text-lg font-semibold tracking-wider uppercase"
        headerNb={2}
      >
        {title}
      </SectionTitle>
      <div
        className={cn(
          'flex flex-col rounded-3xl p-3',
          lightDarkGlassBase,
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}
