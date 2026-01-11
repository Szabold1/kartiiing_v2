"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IRaceEvent, IYearStats } from "@kartiiing/shared-types";
import { getYearStats } from "@/lib/api";

type Props = {
  races: IRaceEvent[];
  selectedYear: number | string;
  setSelectedYear: (year: number | string) => void;
  years: (number | string)[];
};

export default function CalendarHeader({
  races,
  selectedYear,
  setSelectedYear,
  years,
}: Props) {
  const [stats, setStats] = useState<IYearStats | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const yearStats = await getYearStats(selectedYear);
        setStats(yearStats);
      } catch (error) {
        console.error("Error fetching year stats:", error);
        setStats(null);
      }
    };

    fetchStats();
  }, [selectedYear]);

  const buildCalendarDescription = () => {
    let statsData = {
      nbOfRaces: 0,
      nbOfCircuits: 0,
      nbOfChampionships: 0,
    };

    if (stats) {
      statsData = {
        nbOfRaces: stats.races,
        nbOfCircuits: stats.circuits,
        nbOfChampionships: stats.championships,
      };
    } else {
      const uniqueCircuits = Array.from(
        new Set(races.map((r) => r.circuit.id)),
      ).length;

      const uniqueChampionships = Array.from(
        new Set(races.flatMap((r) => r.championships.map((c) => c.id))),
      ).length;

      statsData = {
        nbOfRaces: races.length,
        nbOfCircuits: uniqueCircuits,
        nbOfChampionships: uniqueChampionships,
      };
    }

    return `Discover our ${selectedYear} karting calendar, featuring ${statsData.nbOfRaces} races across ${statsData.nbOfCircuits} circuits, representing ${statsData.nbOfChampionships} championships.`;
  };

  return (
    <PageHeader
      title="Calendar"
      description={buildCalendarDescription()}
      headerAction={
        mounted ? (
          <Select
            value={selectedYear.toString()}
            onValueChange={(val: string) => setSelectedYear(val)}
          >
            <SelectTrigger className="w-24 h-10.5! cursor-pointer font-semibold text-[1rem]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem
                  key={year}
                  value={year.toString()}
                  className="cursor-pointer h-10"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="w-24 h-10.5" />
        )
      }
    />
  );
}
