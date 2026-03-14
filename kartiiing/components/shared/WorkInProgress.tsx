"use client";

import Link from "next/link";
import { Construction } from "lucide-react";

interface Props {
  title?: string;
  message?: string;
  showBackButton?: boolean;
}

export default function WorkInProgress({
  title = "Work in Progress",
  message = "This page is currently under construction. Check back soon!",
  showBackButton = true,
}: Props) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <Construction className="w-20 h-20 mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{message}</p>
        {showBackButton && (
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Home
          </Link>
        )}
      </div>
    </div>
  );
}
