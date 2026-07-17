'use client';

import Link from 'next/link';
import { Construction } from 'lucide-react';

type Props = {
  title?: string;
  message?: string;
  showBackButton?: boolean;
};

export function WorkInProgress({
  title = 'Work in Progress',
  message = 'This page is currently under construction. Check back soon!',
  showBackButton = true,
}: Props) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <Construction className="text-muted-foreground mx-auto mb-6 h-20 w-20" />
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="text-muted-foreground mb-8 text-lg">{message}</p>
        {showBackButton && (
          <Link
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-lg px-6 py-3 font-medium transition-colors"
          >
            Back to Home
          </Link>
        )}
      </div>
    </div>
  );
}
