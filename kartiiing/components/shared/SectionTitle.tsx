import { createElement } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  headerNb?: number;
};

export default function SectionTitle({
  children,
  className = "",
  headerNb = 3,
}: Props) {
  if (headerNb < 1 || headerNb > 6) {
    console.warn(
      `Invalid headerNb value: ${headerNb}. It should be between 1 and 6. Defaulting to h3.`,
    );
    headerNb = 3;
  }

  const tag = `h${headerNb}` as const;

  return createElement(
    tag,
    { className: cn("text-sm text-muted-foreground", className) },
    children,
  );
}
