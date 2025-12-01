"use client";

import { greenGlassHover, lightDarkGlassHover } from "@/lib/classNames";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  variant?: "light" | "green";
  className?: string;
}

export default function HeroLink({
  href,
  children,
  variant = "light",
  className = "",
}: Props) {
  const baseStyles = "px-4.5 sm:px-5.5 py-2.5 font-medium rounded-lg transition-colors";

  const variants = {
    light: `${lightDarkGlassHover}`,
    green: `${greenGlassHover}`,
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
