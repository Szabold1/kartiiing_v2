import { SearchBar } from '@/components/shared/SearchBar';

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
  placeholder = 'Search...',
  children,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-2.5 md:flex-row">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder={placeholder}
      />

      <div className="text-muted-foreground flex w-full items-center justify-between pl-1.5 text-sm">
        <span className="mr-1.5">
          {totalResults === 0
            ? 'No results'
            : `${totalResults} ${totalResults === 1 ? 'result' : 'results'}`}
        </span>

        {children}
      </div>
    </div>
  );
}
