import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({ children, className = "" }: Props) {
  return (
    <h3 className={cn("text-sm text-muted-foreground", className)}>
      {children}
    </h3>
  );
}
