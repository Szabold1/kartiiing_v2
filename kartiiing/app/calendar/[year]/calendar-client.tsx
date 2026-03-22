"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import SearchHeader from "@/components/calendar/SearchHeader";
import CalendarActions from "@/components/calendar/CalendarActions";
import RacesGrid from "@/components/calendar/RacesGrid";
import BackToTopBtn from "@/components/shared/btns/BackToTopBtn";
import { IRaceEvent, RaceEventSortOptions } from "@kartiiing/shared-types";
import { getRaceEvents } from "@/lib/api";

interface Props {
  initialRaces: IRaceEvent[];
  year: string;
  initialSort: RaceEventSortOptions;
  years: number[];
  description: string;
}

export default function CalendarClient({
  initialRaces,
  year,
  initialSort,
  years,
  description,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [races, setRaces] = useState<IRaceEvent[]>(initialRaces);
  const [selectedYear, setSelectedYear] = useState<number | string>(year);
  const [sortOrder, setSortOrder] = useState<RaceEventSortOptions>(
    initialSort === RaceEventSortOptions.DESC
      ? RaceEventSortOptions.DESC
      : RaceEventSortOptions.ASC,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionWidth, setSectionWidth] = useState(0);

  useEffect(() => {
    setRaces(initialRaces);
    setSelectedYear(year);
  }, [initialRaces, year]);

  // Handle search by calling API with search parameter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setRaces(initialRaces);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      try {
        const response = await getRaceEvents({
          year: selectedYear === "all" ? undefined : selectedYear.toString(),
          sort: sortOrder,
          search: searchQuery.trim(),
        });
        setRaces(response.data);
      } catch (error) {
        console.error("Error searching races:", error);
        setRaces([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, initialRaces, sortOrder, selectedYear]);

  // Track section width for responsive design
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    function updateWidth() {
      if (sectionRef.current) setSectionWidth(sectionRef.current.offsetWidth);
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Handle year change by navigating to new route
  const handleYearChange = (newYear: string | number) => {
    const yearString = newYear.toString();
    if (yearString !== selectedYear.toString()) {
      setLoading(true);
      router.push(
        `/calendar/${yearString}?sort=${
          sortOrder === RaceEventSortOptions.DESC ? "desc" : "asc"
        }`,
      );
    }
  };

  // Handle sort order change by navigating to new URL
  const handleSortChange = () => {
    const newSortOrder =
      sortOrder === RaceEventSortOptions.ASC
        ? RaceEventSortOptions.DESC
        : RaceEventSortOptions.ASC;
    const sortParam =
      newSortOrder === RaceEventSortOptions.DESC ? "desc" : "asc";
    setSortOrder(newSortOrder);

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("sort", sortParam);
    router.replace(currentUrl.pathname + currentUrl.search);
  };

  // Fetch races from API when sortOrder changes (but not year, as that's handled by navigation)
  useEffect(() => {
    if (
      sortOrder ===
      (initialSort === RaceEventSortOptions.DESC
        ? RaceEventSortOptions.DESC
        : RaceEventSortOptions.ASC)
    )
      return;

    setLoading(true);
    const fetchRaces = async () => {
      try {
        const response = await getRaceEvents({
          year: selectedYear === "all" ? undefined : selectedYear.toString(),
          sort: sortOrder,
        });
        setRaces(response.data);
      } catch (error) {
        console.error("Error loading races:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRaces();
  }, [sortOrder, selectedYear, initialSort]);

  // Render calendar actions (view toggle, sort toggle, next race button)
  function renderCalendarActions(small = false) {
    return (
      <CalendarActions
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        races={races}
        small={small}
      />
    );
  }

  return (
    <>
      <div
        ref={sectionRef}
        className="container flex flex-1 items-stretch justify-between mx-auto"
      >
        <section className="flex-1 mx-auto lg:px-8">
          <div className="sm:px-5 md:px-6 lg:px-2">
            <CalendarHeader
              description={description}
              selectedYear={selectedYear}
              setSelectedYear={handleYearChange}
              years={years}
            />

            <div className="flex flex-col md:flex-row gap-2 mb-2 items-center">
              <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                races={races}
              >
                {sectionWidth < 768 && renderCalendarActions(true)}
              </SearchHeader>

              {sectionWidth >= 768 && renderCalendarActions()}
            </div>

            <div className="my-4 py-4 border-t border-dashed">
              <RacesGrid
                races={races}
                loading={loading}
                sectionWidth={sectionWidth}
              />
            </div>
          </div>
        </section>

        <BackToTopBtn />
      </div>
    </>
  );
}
