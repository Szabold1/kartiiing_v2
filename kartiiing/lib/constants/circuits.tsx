import { ArrowDown, ArrowUp, Grid, List } from "lucide-react";
import { CircuitsOrderPreset } from "@kartiiing/shared";
import type { OrderPreset } from "@/components/shared/OrderDropdown";

export enum CircuitsViewMode {
  GRID = "grid",
  LIST = "list",
}

export const CIRCUITS_VIEW_MODE_KEY = "circuitsViewMode";

export const CIRCUIT_PRESETS: readonly OrderPreset<CircuitsOrderPreset>[] = [
  {
    value: CircuitsOrderPreset.LOCATION_ASC,
    label: "Location name",
    icon: ArrowUp,
  },
  {
    value: CircuitsOrderPreset.LOCATION_DESC,
    label: "Location name",
    icon: ArrowDown,
  },
  {
    value: CircuitsOrderPreset.LENGTH_ASC,
    label: "Length",
    icon: ArrowUp,
  },
  {
    value: CircuitsOrderPreset.LENGTH_DESC,
    label: "Length",
    icon: ArrowDown,
  },
  {
    value: CircuitsOrderPreset.DISTANCE_ASC,
    label: "Distance",
    icon: ArrowUp,
  },
  {
    value: CircuitsOrderPreset.DISTANCE_DESC,
    label: "Distance",
    icon: ArrowDown,
  },
] as const;

export const CIRCUITS_VIEW_OPTIONS = [
  {
    value: CircuitsViewMode.GRID,
    icon: <Grid className="size-4" />,
    label: "Grid view",
  },
  {
    value: CircuitsViewMode.LIST,
    icon: <List className="size-4" />,
    label: "List view",
  },
] as const;
