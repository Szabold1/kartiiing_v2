import type { ReactNode } from "react";
import { cn, badgeBase, grayGlassBase } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: Props) {
  return (
    <span className={cn(badgeBase, grayGlassBase, className)}>{children}</span>
  );
}
