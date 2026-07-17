import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const PageWrapper = forwardRef<HTMLDivElement, Props>(
  ({ children, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'container mx-auto flex flex-1 items-stretch justify-between',
          className,
        )}
      >
        <section className="mx-auto flex-1 lg:px-8">
          <div className="sm:px-5 md:px-6 lg:px-2">{children}</div>
        </section>
      </div>
    );
  },
);

PageWrapper.displayName = 'PageWrapper';
