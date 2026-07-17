'use client';

import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useRef } from 'react';

type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({
  searchQuery,
  setSearchQuery,
  placeholder = 'Search...',
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function clearSearch() {
    setSearchQuery('');
    inputRef.current?.focus();
  }

  function handleEscapeKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      if (searchQuery) {
        clearSearch();
      } else {
        inputRef.current?.blur();
      }
    }
  }

  return (
    <div className="relative flex items-center md:max-w-md">
      <Input
        id="search-bar"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => handleEscapeKey(e)}
        ref={inputRef}
        className="h-10.5 w-full md:w-sm"
      />

      {searchQuery && (
        <button
          aria-label="Clear search"
          onClick={clearSearch}
          className="hover:bg-accent absolute right-1 cursor-pointer rounded-md border p-1 text-zinc-600 dark:text-zinc-300"
        >
          <X className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
