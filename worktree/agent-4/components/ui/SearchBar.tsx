'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative w-full max-w-3xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="어떤 도시에서 노마드 하고 싶으신가요?"
          className="w-full rounded-full border-2 border-gold/50 bg-luxury-black/80 px-8 py-5 pl-14 text-sm font-medium text-gold-light backdrop-blur-xl transition-all placeholder:text-gold-light/50 focus:border-gold focus:outline-none focus:ring-4 focus:ring-gold/30 focus:luxury-glow"
          style={{fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem'}}
        />
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
          🔍
        </span>
      </div>
    </div>
  );
}
