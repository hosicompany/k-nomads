'use client';

import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface SearchInputRef {
  focus: () => void;
  blur: () => void;
}

const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(
  ({ value, onChange, placeholder = '도시 이름으로 검색...' }, ref) => {
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose focus and blur methods to parent
    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }));

    // 입력값이 외부에서 변경되면 로컬 상태 업데이트
    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    // 디바운싱: 300ms 후에 onChange 호출
    useEffect(() => {
      const timer = setTimeout(() => {
        onChange(localValue);
      }, 300);

      return () => clearTimeout(timer);
    }, [localValue, onChange]);

    const handleClear = () => {
      setLocalValue('');
      onChange('');
    };

    return (
      <div className="relative w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />

        {localValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            aria-label="검색어 지우기"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
