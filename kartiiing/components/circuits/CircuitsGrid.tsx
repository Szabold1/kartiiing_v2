import { CircuitCard } from "@/components/circuit/CircuitCard";
import { Loader } from "@/components/shared/Loader";
import { ErrorState } from "@/components/shared/ErrorState";
import { ICircuit } from "@kartiiing/shared";
import { CircuitsViewMode } from "@/lib/constants/circuits";
import { useCircuitsStore } from "@/lib/stores/circuitsStore";
import {
  cn,
  getGridWidthClass,
  listViewContainerClasses,
  gridViewContainerBase,
} from "@/lib/utils";

type Props = {
  circuits: ICircuit[];
  loading: boolean;
  sectionWidth: number;
  loadingMore?: boolean;
};

export function CircuitsGrid({
  circuits,
  loading,
  sectionWidth,
  loadingMore = false,
}: Props) {
  const viewMode = useCircuitsStore((state) => state.viewMode);
  const showListView =
    viewMode === CircuitsViewMode.LIST && sectionWidth >= 850;

  if (loading) {
    return <Loader />;
  }

  if (circuits.length === 0) {
    return <ErrorState message="No circuits found" />;
  }

  return (
    <>
      <div
        className={
          showListView
            ? listViewContainerClasses
            : cn(gridViewContainerBase, getGridWidthClass(circuits.length))
        }
      >
        {circuits.map((circuit) => (
          <CircuitCard
            key={circuit.id}
            circuit={circuit}
            variant={showListView ? "row" : "card"}
          />
        ))}

        {/* Loading indicator when fetching more */}
        {loadingMore && <Loader />}
      </div>
    </>
  );
}
