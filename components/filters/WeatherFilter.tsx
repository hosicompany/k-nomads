'use client';

import { WeatherType, weatherLabels } from '@/types/filters';

export interface WeatherFilterProps {
  value: WeatherType[];
  onChange: (value: WeatherType[]) => void;
}

const weatherOptions: WeatherType[] = ['warm', 'cool', 'hot'];

export default function WeatherFilter({ value, onChange }: WeatherFilterProps) {
  const handleToggle = (weather: WeatherType) => {
    if (value.includes(weather)) {
      onChange(value.filter((w) => w !== weather));
    } else {
      onChange([...value, weather]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-900">
        🌤️ 날씨
      </label>
      <div className="space-y-2">
        {weatherOptions.map((weather) => (
          <label
            key={weather}
            className="flex cursor-pointer items-center gap-2"
          >
            <input
              type="checkbox"
              checked={value.includes(weather)}
              onChange={() => handleToggle(weather)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 transition-colors focus:ring-2 focus:ring-blue-500/20"
            />
            <span className="text-sm text-gray-700">
              {weatherLabels[weather]}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
