"use client";

import { Input } from "@/components/ui/input";

type Props = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filteredCount: number;
};

export default function SearchBar({
  searchQuery,
  onSearchChange,
  filteredCount,
}: Props) {
  const terms = searchQuery.split(" ").filter(Boolean);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-x-4 gap-y-2 w-full mb-5">
      {/* Input */}
      <div className="w-full md:max-w-md">
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Result summary */}
      <p className="text-sm text-muted-foreground flex items-center flex-wrap gap-1 pl-2 pt-1.5 md:pt-0">
        <span className="mr-1.5">
          {filteredCount === 0
            ? "No results"
            : `${filteredCount} ${
                filteredCount === 1 ? "result" : "results"
              } found`}
        </span>

        {terms.map((word, idx) => (
          <span
            key={idx}
            className="inline-flex items-center justify-center leading-tight rounded-md bg-muted px-2 py-1 text-xs font-medium"
          >
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
