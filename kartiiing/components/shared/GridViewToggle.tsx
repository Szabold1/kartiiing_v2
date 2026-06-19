import { Button } from "@/components/ui/button";
import { cn, lightDarkGlassActive, lightDarkGlassBase } from "@/lib/utils";

interface Option<T extends string> {
  value: T;
  icon: React.ReactNode;
  label: string;
}

interface Props<T extends string> {
  viewMode: T;
  setViewMode: (mode: T) => void;
  options: Option<T>[];
  className?: string;
}

export default function GridViewToggle<T extends string>({
  viewMode,
  setViewMode,
  options,
  className = "",
}: Props<T>) {
  return (
    <div
      className={cn(
        "flex rounded-lg h-10.5 items-center justify-center p-[0.1rem]",
        lightDarkGlassBase,
        className,
      )}
    >
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant="outline"
          aria-label={opt.label}
          className={cn(
            "w-[2.33rem] h-[2.33rem] border-transparent shadow-none dark:bg-transparent rounded-[0.55rem]",
            viewMode === opt.value
              ? lightDarkGlassActive
              : "opacity-60 hover:opacity-100",
          )}
          onClick={() => setViewMode(opt.value)}
        >
          {opt.icon}
        </Button>
      ))}
    </div>
  );
}
