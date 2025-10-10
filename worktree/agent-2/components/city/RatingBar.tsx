interface RatingBarProps {
  label: string;
  icon: string;
  rating: number;
  maxRating?: number;
}

export default function RatingBar({
  label,
  icon,
  rating,
  maxRating = 5,
}: RatingBarProps) {
  const percentage = (rating / maxRating) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="flex w-24 items-center gap-1 text-xs text-gray-600">
        <span>{icon}</span>
        <span className="truncate">{label}</span>
      </div>
      <div className="flex-1">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="w-8 text-right text-sm font-semibold text-gray-900">
        {rating.toFixed(1)}
      </div>
    </div>
  );
}
