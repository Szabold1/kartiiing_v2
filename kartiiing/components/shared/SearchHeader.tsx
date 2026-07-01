import { SearchBar } from "@/components/shared/SearchBar";

type Props = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalResults: number;
  placeholder?: string;
  children?: React.ReactNode;
};

export function SearchHeader({
  searchQuery,
  setSearchQuery,
  totalResults,
  placeholder = "Search...",
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-2.5 w-full md:flex-row">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={placeholder}
      />

      <div className="text-sm text-muted-foreground pl-1.5 flex items-center w-full justify-between">
        <span className="mr-1.5">
          {totalResults === 0
            ? "No results"
            : `${totalResults} ${totalResults === 1 ? "result" : "results"}`}
        </span>

        {children}
      </div>
    </div>
  );
}
