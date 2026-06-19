import GridViewToggle from "@/components/shared/GridViewToggle";
import { Grid, List } from "lucide-react";
import { CircuitsViewMode } from "@/lib/constants/circuits";
import { useCircuitsStore } from "@/lib/stores/circuitsStore";

type Props = {
  small?: boolean;
};

export default function CircuitsActions({ small = false }: Props) {
  const { viewMode, setViewMode } = useCircuitsStore();

  const options = [
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
  ];

  if (small) {
    return <div className="flex items-center gap-2"></div>;
  }

  return (
    <div className="flex items-center gap-2">
      <GridViewToggle
        viewMode={viewMode}
        setViewMode={setViewMode}
        options={options}
      />
    </div>
  );
}
