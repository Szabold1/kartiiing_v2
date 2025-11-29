import SearchBar from "@/components/calendar/SearchBar";
import { IRaceEvent } from "@kartiiing/shared-types";

type Props = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  races: IRaceEvent[];
  children?: React.ReactNode;
};

export default function SearchHeader({
  searchQuery,
  setSearchQuery,
  races,
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-2.5 w-full md:flex-row">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="text-sm text-muted-foreground pl-1.5 flex items-center w-full justify-between">
        <span className="mr-1.5">
          {races.length === 0
            ? "No results"
            : `${races.length} ${races.length === 1 ? "result" : "results"}`}
        </span>

        {children}
      </div>
    </div>
  );
}
