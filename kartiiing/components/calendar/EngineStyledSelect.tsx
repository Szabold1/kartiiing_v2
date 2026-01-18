import {
  EngineColorVariant,
  getColorsForEngine,
} from "@/lib/constants/categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  engineType?: string;
};

export default function GenericSelect({
  label,
  options,
  value,
  onValueChange,
  isOpen,
  onOpenChange,
  engineType = "",
}: Props) {
  if (options.length === 0) {
    return null;
  }

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger
        className={`!h-9.5 cursor-pointer transition ${getColorsForEngine(engineType, EngineColorVariant.FULL)}`}
      >
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent className={getColorsForEngine(engineType)}>
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className={`${getColorsForEngine(
              engineType,
              EngineColorVariant.HOVER,
            )} cursor-pointer transition h-10`}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
