'use client';

import { SortOption, sortLabels } from '@/types/filters';

export interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: SortOption[] = [
  'rating',
  'popularity',
  'cost-asc',
  'cost-desc',
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  const handleChange = (selectedValue: string) => {
    onChange(selectedValue as SortOption);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-900">
        📊 정렬
      </label>
      <select
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            {sortLabels[option]}
          </option>
        ))}
      </select>
    </div>
  );
}
