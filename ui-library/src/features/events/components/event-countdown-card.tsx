import { EventCountdownClock, type CountdownValue } from './event-countdown-clock';
import { EventRegisterButton } from './event-register-button';

export type { CountdownValue };

export interface EventCountdownCardProps {
  eventTitle: string;
  categoryTag: string;
  spotsLeft: number;
  location: string;
  dateText: string;
  countdown: CountdownValue;
  onRegisterClick?: () => void;
}

const URGENT_SPOTS = 15;

function normalizeSpots(value: number): number {
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function SpotsBadge({ spots }: { spots: number }) {
  if (spots === 0) {
    return <span className="badge badge-error">Cupos agotados</span>;
  }

  const text = spots === 1 ? '1 cupo restante' : `${spots} cupos restantes`;

  if (spots <= URGENT_SPOTS) {
    return (
      <span className="badge badge-warning gap-2 font-semibold">
        <span
          className="size-2 animate-pulse rounded-full bg-warning-content motion-reduce:animate-none"
          aria-hidden="true"
        />
        {text}
      </span>
    );
  }

  return <span className="badge badge-ghost">{text}</span>;
}

export function EventCountdownCard({
  eventTitle,
  categoryTag,
  spotsLeft,
  location,
  dateText,
  countdown,
  onRegisterClick,
}: EventCountdownCardProps) {
  const spots = normalizeSpots(spotsLeft);

  return (
    <article className="card w-full border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-4 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="badge badge-primary h-auto py-1 font-semibold uppercase">
            {categoryTag}
          </span>
          <SpotsBadge spots={spots} />
        </div>

        <div>
          <h3 className="card-title text-lg wrap-break-word">{eventTitle}</h3>
          <p className="text-sm text-base-content/70">
            {location} <span aria-hidden="true">•</span> {dateText}
          </p>
        </div>

        <EventCountdownClock countdown={countdown} />

        <EventRegisterButton isSoldOut={spots === 0} onRegisterClick={onRegisterClick} />
      </div>
    </article>
  );
}
