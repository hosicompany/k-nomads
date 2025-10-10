'use client';

export interface CostRangeFilterProps {
  minCost: number | null;
  maxCost: number | null;
  onChange: (minCost: number | null, maxCost: number | null) => void;
}

export default function CostRangeFilter({
  minCost,
  maxCost,
  onChange,
}: CostRangeFilterProps) {
  const handleMinChange = (value: string) => {
    const num = value ? parseInt(value, 10) : null;
    onChange(num, maxCost);
  };

  const handleMaxChange = (value: string) => {
    const num = value ? parseInt(value, 10) : null;
    onChange(minCost, num);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-900">
        💰 생활비 (만원/월)
      </label>
      <div className="flex items-center gap-3">
        <input
          type="number"
          value={minCost ?? ''}
          onChange={(e) => handleMinChange(e.target.value)}
          placeholder="최소"
          min="0"
          className="flex-1 min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        <span className="shrink-0 text-gray-400">~</span>
        <input
          type="number"
          value={maxCost ?? ''}
          onChange={(e) => handleMaxChange(e.target.value)}
          placeholder="최대"
          min="0"
          className="flex-1 min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>
    </div>
  );
}
