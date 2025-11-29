"use client";

import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useRef } from "react";

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
};

export default function SearchBar({ searchQuery, setSearchQuery }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function clearSearch() {
    setSearchQuery("");
    inputRef.current?.focus();
  }

  return (
    <div className="md:max-w-md flex items-center relative">
      <Input
        placeholder="Search... (e.g. kz2 summer)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        ref={inputRef}
        className="w-full md:w-sm h-10.5"
      />

      {searchQuery && (
        <X
          className="w-8.5 h-8.5 p-1 absolute right-1 border rounded-sm cursor-pointer text-zinc-600 dark:text-zinc-300 hover:bg-accent "
          onClick={clearSearch}
        />
      )}
    </div>
  );
}
