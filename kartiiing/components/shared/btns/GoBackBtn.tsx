'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export function GoBackBtn({ className }: Props) {
  const router = useRouter();

  const handleNavigation = () => {
    router.back();
  };

  return (
    <button
      type="button"
      aria-label="Go back"
      onClick={handleNavigation}
      className={cn('h-10.5 w-10.5 cursor-pointer rounded-lg p-2', className)}
    >
      <ArrowLeft className="h-full w-full" />
    </button>
  );
}
