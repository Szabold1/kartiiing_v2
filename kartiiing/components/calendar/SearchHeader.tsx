import SearchBar from "@/components/calendar/SearchBar";
import { RaceEventGrouped } from "@/lib/types/RaceTypes";

type Props = {
  useRaceSearchData: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filteredRaces: RaceEventGrouped[];
  };
  children?: React.ReactNode;
};

export default function SearchHeader({ useRaceSearchData, children }: Props) {
  const { searchQuery, setSearchQuery, filteredRaces } = useRaceSearchData;

  return (
    <div className="flex flex-col gap-2.5 w-full md:flex-row">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="text-sm text-muted-foreground pl-1.5 flex items-center w-full justify-between">
        <span className="mr-1.5">
          {filteredRaces.length === 0
            ? "No results"
            : `${filteredRaces.length} ${
                filteredRaces.length === 1 ? "result" : "results"
              } found`}
        </span>

        {children}
      </div>
    </div>
  );
}
