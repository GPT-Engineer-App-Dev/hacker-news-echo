import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setSearchParams({ q: searchTerm });
      } else {
        setSearchParams({});
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, setSearchParams]);

  return (
    <div className="mb-8">
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md mx-auto"
      />
    </div>
  );
};

export default SearchBar;