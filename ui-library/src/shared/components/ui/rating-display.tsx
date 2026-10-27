export interface RatingDisplayProps {
  score: number;
  totalReviews?: number;
  showScoreText?: boolean;
  maxScore?: number;
}

function normalizeMax(value: number): number {
  return Number.isFinite(value) ? Math.min(10, Math.max(1, Math.floor(value))) : 5;
}

function normalizeScore(value: number, max: number): number {
  return Number.isFinite(value) ? Math.min(max, Math.max(0, value)) : 0;
}

export function RatingDisplay({
  score,
  totalReviews,
  showScoreText = true,
  maxScore = 5,
}: RatingDisplayProps) {
  const max = normalizeMax(maxScore);
  const safeScore = normalizeScore(score, max);
  const halves = Math.round(safeScore * 2);
  const scoreText = safeScore.toFixed(1);
  const stars = Array.from({ length: max }, (_, index) => index);
  const hasReviews =
    totalReviews !== undefined && Number.isFinite(totalReviews) && totalReviews >= 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        role="img"
        aria-label={`Calificación: ${scoreText} de ${max}`}
        className="rating rating-sm rating-half"
      >
        {stars.flatMap((index) => [
          <div
            key={`${index}-a`}
            className={`mask mask-star-2 mask-half-1 ${
              index * 2 < halves ? 'bg-warning opacity-100' : ''
            }`}
          />,
          <div
            key={`${index}-b`}
            className={`mask mask-star-2 mask-half-2 ${
              index * 2 + 1 < halves ? 'bg-warning opacity-100' : ''
            }`}
          />,
        ])}
      </div>
      {showScoreText ? (
        <span className="text-sm font-semibold">{scoreText}</span>
      ) : null}
      {hasReviews ? (
        <span className="text-sm text-base-content/70">
          ({totalReviews} {totalReviews === 1 ? 'reseña' : 'reseñas'})
        </span>
      ) : null}
    </div>
  );
}