'use client';

import { Button } from '@/components/ui/button';
import { cn, greenGlassHover } from '@/lib/utils';

type Props = {
  className?: string;
};

export function LoginBtn({ className }: Props) {
  return (
    <Button
      size="lg"
      className={cn(
        'flex h-9 text-center font-medium tracking-wide uppercase',
        greenGlassHover,
        className,
      )}
    >
      Login
    </Button>
  );
}
