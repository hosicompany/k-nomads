'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="어떤 도시에서 노마드 하고 싶으신가요?"
          className="w-full rounded-full border-2 border-gray-200 bg-white px-6 py-4 pl-12 text-sm shadow-lg transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
          🔍
        </span>
      </div>
    </div>
  );
}
