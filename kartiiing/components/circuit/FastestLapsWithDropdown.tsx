"use client";

import { useState, useMemo, useEffect } from "react";
import { IFastestLap } from "@kartiiing/shared";
import { FastestLapCard } from "@/components/circuit/FastestLapCard";
import { EngineStyledSelect } from "@/components/circuit/EngineStyledSelect";
import { getFastestLap } from "@/lib/utils/raceUtils";
import { cn } from "@/lib/utils";

enum DropdownType {
  Engine = "engine",
  Category = "category",
  Year = "year",
}

type Props = {
  fastestLaps: IFastestLap[];
  className?: string;
  showYears?: boolean;
  preferredEngineTypes?: string[];
};

export function FastestLapsWithDropdown({
  fastestLaps,
  className = "",
  showYears = false,
  preferredEngineTypes = [],
}: Props) {
  // Determine initial engine type based on preference
  const initialEngineType = useMemo(() => {
    const engineTypes = Array.from(
      new Set(fastestLaps.map((lap) => lap.engineType)),
    );

    if (preferredEngineTypes.length > 0) {
      const preferredLaps = fastestLaps.filter((lap) =>
        preferredEngineTypes.includes(lap.engineType),
      );
      const fastestLap = getFastestLap(preferredLaps);
      if (fastestLap) return fastestLap.engineType;

      const preferred = preferredEngineTypes.find((type) =>
        engineTypes.includes(type),
      );
      if (preferred) return preferred;
    }

    return engineTypes[0] || "";
  }, [fastestLaps, preferredEngineTypes]);

  const [selectedEngineType, setSelectedEngineType] =
    useState<string>(initialEngineType);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("All Time");
  const [openDropdown, setOpenDropdown] = useState<DropdownType | null>(null);

  // Sync selectedEngineType when initialEngineType changes (e.g., data loaded async)
  useEffect(() => {
    if (initialEngineType && initialEngineType !== selectedEngineType) {
      setSelectedEngineType(initialEngineType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialEngineType]);

  // Set initial category to the fastest lap when engine type changes
  useEffect(() => {
    const laps = fastestLaps.filter(
      (lap) => lap.engineType === selectedEngineType,
    );
    if (laps.length === 0) {
      setSelectedCategory("");
      return;
    }
    const fastestLap = getFastestLap(laps);
    if (fastestLap) setSelectedCategory(fastestLap.category);
  }, [selectedEngineType, fastestLaps]);

  // Sync year when category changes
  useEffect(() => {
    if (showYears) {
      setSelectedYear("All Time");
    }
  }, [selectedCategory, showYears]);

  // Find selected lap
  const selectedLap = useMemo(() => {
    if (!selectedEngineType || !selectedCategory) return null;

    if (showYears && selectedYear && selectedYear !== "All Time") {
      return (
        fastestLaps.find(
          (lap) =>
            lap.engineType === selectedEngineType &&
            lap.category === selectedCategory &&
            new Date(lap.date).getFullYear().toString() === selectedYear,
        ) || null
      );
    }

    return (
      fastestLaps.find(
        (lap) =>
          lap.engineType === selectedEngineType &&
          lap.category === selectedCategory,
      ) || null
    );
  }, [
    fastestLaps,
    selectedEngineType,
    selectedCategory,
    selectedYear,
    showYears,
  ]);

  // Get available engine types
  const engineTypeOptions = useMemo(() => {
    return Array.from(new Set(fastestLaps.map((lap) => lap.engineType)));
  }, [fastestLaps]);

  // Get available categories for selected engine type
  const categoryOptions = useMemo(() => {
    return Array.from(
      new Set(
        fastestLaps
          .filter((lap) => lap.engineType === selectedEngineType)
          .map((lap) => lap.category),
      ),
    );
  }, [fastestLaps, selectedEngineType]);

  // Get available years for selected engine type and category
  const yearOptions = useMemo(() => {
    const years = Array.from(
      new Set(
        fastestLaps
          .filter(
            (lap) =>
              lap.engineType === selectedEngineType &&
              lap.category === selectedCategory,
          )
          .map((lap) => new Date(lap.date).getFullYear().toString()),
      ),
    ).sort((a, b) => parseInt(b) - parseInt(a));
    return ["All Time", ...years];
  }, [fastestLaps, selectedEngineType, selectedCategory]);

  if (!fastestLaps || fastestLaps.length === 0) {
    return null;
  }

  return (
    <section className={cn("space-y-2.5", className)}>
      <div className="flex items-center gap-1.5 flex-wrap">
        <EngineStyledSelect
          label="Engine Type"
          options={engineTypeOptions}
          value={selectedEngineType}
          onValueChange={setSelectedEngineType}
          isOpen={openDropdown === DropdownType.Engine}
          onOpenChange={(open) =>
            setOpenDropdown(open ? DropdownType.Engine : null)
          }
          engineType={selectedEngineType}
        />
        <EngineStyledSelect
          label="Category"
          options={categoryOptions}
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          isOpen={openDropdown === DropdownType.Category}
          onOpenChange={(open) =>
            setOpenDropdown(open ? DropdownType.Category : null)
          }
          engineType={selectedEngineType}
        />
        {showYears && (
          <EngineStyledSelect
            label="Year"
            options={yearOptions}
            value={selectedYear}
            onValueChange={setSelectedYear}
            isOpen={openDropdown === DropdownType.Year}
            onOpenChange={(open) =>
              setOpenDropdown(open ? DropdownType.Year : null)
            }
            engineType={selectedEngineType}
          />
        )}
      </div>

      {selectedLap && <FastestLapCard lap={selectedLap} variant="compact" />}
    </section>
  );
}
