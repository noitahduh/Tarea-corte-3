import Link from 'next/link';

export interface CourseCardProps {
  courseCode: string;
  title: string;
  instructor: string;
  room: string;
  credits: number;
  progressPercentage: number;
  courseUrl: string;
  syllabusUrl?: string;
  isSelected?: boolean;
  onViewDetails?: () => void;
  onToggleSelect?: () => void;
  onLinkClick?: () => void;
}

function normalizeProgress(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

function formatCredits(value: number): string {
  return Number.isFinite(value) && value >= 0 ? String(value) : '—';
}

export function CourseCard({
  courseCode,
  title,
  instructor,
  room,
  credits,
  progressPercentage,
  courseUrl,
  syllabusUrl,
  isSelected = false,
  onViewDetails,
  onToggleSelect,
  onLinkClick,
}: CourseCardProps) {
  const progress = normalizeProgress(progressPercentage);

  return (
    <article
      className={`card overflow-hidden border bg-base-100 shadow-sm ${
        isSelected ? 'border-primary ring-2 ring-primary' : 'border-base-300'
      }`}
    >
      <header className="bg-linear-to-r from-primary to-secondary px-4 py-3 text-primary-content">
        <div className="flex items-start justify-between gap-2">
          <p className="text-xs font-semibold tracking-wide uppercase">
            {courseCode}
          </p>
          {isSelected ? (
            <span className="badge badge-accent badge-sm shrink-0">
              Seleccionada
            </span>
          ) : null}
        </div>
        <h3 className="text-lg font-bold wrap-break-word">{title}</h3>
      </header>

      <div className="card-body gap-4">
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
          <dt className="font-semibold">Docente</dt>
          <dd className="min-w-0 wrap-break-word">{instructor}</dd>
          <dt className="font-semibold">Salón</dt>
          <dd className="min-w-0 wrap-break-word">{room}</dd>
          <dt className="font-semibold">Créditos</dt>
          <dd>{formatCredits(credits)}</dd>
        </dl>

        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Avance</span>
            <span>{progress}%</span>
          </div>
          <progress
            className="progress progress-primary w-full"
            value={progress}
            max={100}
            aria-label={`Avance de ${title}`}
          />
        </div>

        <div className="card-actions">
          <Link
            href={courseUrl}
            className="btn btn-primary btn-sm"
            onClick={onLinkClick}
          >
            Ir al aula
          </Link>
          {syllabusUrl ? (
            <Link
              href={syllabusUrl}
              className="btn btn-outline btn-primary btn-sm"
              onClick={onLinkClick}
            >
              Ver programa
            </Link>
          ) : null}
        </div>

        {onViewDetails || onToggleSelect ? (
          <div className="card-actions border-t border-base-300 pt-3">
            {onViewDetails ? (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={onViewDetails}
              >
                Ver detalle
              </button>
            ) : null}
            {onToggleSelect ? (
              <button
                type="button"
                className={`btn btn-sm ${
                  isSelected ? 'btn-secondary' : 'btn-outline btn-secondary'
                }`}
                aria-pressed={isSelected}
                onClick={onToggleSelect}
              >
                Seleccionar
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}