'use client';

import { internetSpeedOptions } from '@/types/filters';

export interface InternetSpeedFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export default function InternetSpeedFilter({
  value,
  onChange,
}: InternetSpeedFilterProps) {
  const handleChange = (selectedValue: string) => {
    const num = parseInt(selectedValue, 10);
    onChange(num === 0 ? null : num);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-900">
        📡 인터넷 속도
      </label>
      <select
        value={value ?? 0}
        onChange={(e) => handleChange(e.target.value)}
        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        {internetSpeedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
