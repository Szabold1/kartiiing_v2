import { createElement } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  headerNb?: 1 | 2 | 3 | 4 | 5 | 6;
};

export default function SectionTitle({
  children,
  className = "",
  headerNb = 3,
}: Props) {
  const tag = `h${headerNb}` as const;

  return createElement(
    tag,
    { className: cn("text-sm text-muted-foreground", className) },
    children,
  );
}
