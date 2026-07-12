import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type OrderPreset<T extends string = string> = {
  value: T;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type Props<T extends string> = {
  value: T;
  onChange: (preset: T) => void;
  presets: readonly OrderPreset<T>[];
  className?: string;
};

export function OrderDropdown<T extends string>({
  value,
  onChange,
  presets,
  className,
}: Props<T>) {
  const displayMap: Record<
    string,
    { label: string; Icon?: React.ComponentType<{ className?: string }> }
  > = Object.fromEntries(
    presets.map((p) => [p.value, { label: p.label, Icon: p.icon }]),
  );

  const active = displayMap[value];
  const Icon = active?.Icon;

  return (
    <Select value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger
        className={cn("h-10.5! cursor-pointer text-sm font-medium", className)}
        suppressHydrationWarning
      >
        <SelectValue>
          <span className="flex items-center gap-1.5">
            {Icon && <Icon className="w-3.5 h-3.5" />}
            {active?.label ?? value}
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {presets.map((preset) => (
          <SelectItem
            key={preset.value}
            value={preset.value}
            className="cursor-pointer h-10"
          >
            <span className="flex items-center gap-1.5">
              {preset.icon && <preset.icon className="w-3.5 h-3.5" />}
              {preset.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
