"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRef } from "react";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  filteredCount: number;
};

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  filteredCount,
}: Props) {
  const terms = searchQuery.split(" ").filter(Boolean);
  const inputRef = useRef<HTMLInputElement>(null);

  function clearSearch() {
    setSearchQuery("");
    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-x-4 gap-y-2 w-full mb-5">
      {/* Input */}
      <div className="w-full md:max-w-md flex items-center relative">
        <Input
          placeholder="Search... (e.g. kz2 summer)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={inputRef}
        />

        {searchQuery && (
          <X
            className="w-6.5 h-6.5 p-1 absolute right-1.5 border rounded-sm cursor-pointer text-zinc-600 dark:text-zinc-300 hover:bg-accent "
            onClick={clearSearch}
          />
        )}
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
