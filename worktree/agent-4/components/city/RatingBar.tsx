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
      <div className="flex w-28 items-center gap-2 text-xs text-gold-light">
        <span className="text-base">{icon}</span>
        <span className="truncate font-medium" style={{fontFamily: 'Cormorant Garamond, serif'}}>
          {label}
        </span>
      </div>
      <div className="flex-1">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-luxury-black/60 border border-gold/20">
          <div
            className="h-full rounded-full luxury-gradient transition-all"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
      <div className="w-10 text-right text-sm font-bold text-gold" style={{fontFamily: 'Playfair Display, serif'}}>
        {rating.toFixed(1)}
      </div>
    </div>
  );
}
