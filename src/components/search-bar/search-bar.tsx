import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  searchInput: string;
  handleInputChange: (e: ChangeEvent) => void;
}

function SearchBar({ searchInput, handleInputChange }: SearchBarProps) {
  return (
    <div>
      <input
        type="text"
        placeholder="What test are you looking for?"
        value={searchInput}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
