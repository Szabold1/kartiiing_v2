"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRef } from "react";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function clearSearch() {
    setSearchQuery("");
    inputRef.current?.focus();
  }

  function handleEscapeKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      if (searchQuery) {
        clearSearch();
      } else {
        inputRef.current?.blur();
      }
    }
  }

  return (
    <div className="md:max-w-md flex items-center relative">
      <Input
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => handleEscapeKey(e)}
        ref={inputRef}
        className="w-full md:w-sm h-10.5"
      />

      {searchQuery && (
        <button
          aria-label="Clear search"
          onClick={clearSearch}
          className="absolute right-1 cursor-pointer text-zinc-600 dark:text-zinc-300 hover:bg-accent border rounded-sm p-1"
        >
          <X className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
