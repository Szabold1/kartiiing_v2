import { GridViewToggle } from '@/components/shared/GridViewToggle';
import { OrderDropdown } from '@/components/shared/OrderDropdown';
import {
  CALENDAR_PRESETS,
  CALENDAR_VIEW_OPTIONS,
} from '@/lib/constants/calendar';
import { useCalendarStore } from '@/lib/stores/calendarStore';
import { CalendarOrderPreset } from '@kartiiing/shared';

type Props = {
  preset: CalendarOrderPreset;
  onPresetChange: (preset: CalendarOrderPreset) => void;
  small?: boolean;
};

export function CalendarActions({
  preset,
  onPresetChange,
  small = false,
}: Props) {
  const { viewMode, setViewMode } = useCalendarStore();

  const alwaysDisplay = () => {
    return (
      <OrderDropdown
        value={preset}
        onChange={onPresetChange}
        presets={CALENDAR_PRESETS}
        className="text-foreground"
      />
    );
  };

  if (small) {
    return <div className="flex items-center gap-2">{alwaysDisplay()}</div>;
  }

  return (
    <div className="flex h-9.5 items-center gap-2">
      <GridViewToggle
        viewMode={viewMode}
        setViewMode={setViewMode}
        options={CALENDAR_VIEW_OPTIONS}
      />
      {alwaysDisplay()}
    </div>
  );
}
