export type StatusBadgeStatus = 'active' | 'pending' | 'danger' | 'neutral';

export interface StatusBadgeProps {
  status: StatusBadgeStatus;
  label: string;
  hasPulse?: boolean;
  className?: string;
}

const statusStyles: Record<StatusBadgeStatus, { badge: string; dot: string }> =
  {
    active: { badge: 'badge-success border-success', dot: 'bg-success' },
    pending: { badge: 'badge-warning border-warning', dot: 'bg-warning' },
    danger: { badge: 'badge-error border-error', dot: 'bg-error' },
    neutral: { badge: 'badge-neutral border-neutral', dot: 'bg-neutral' },
  };

export function StatusBadge({
  status,
  label,
  hasPulse = false,
  className = '',
}: StatusBadgeProps) {
  const { badge, dot } = statusStyles[status];

  return (
    <span
      className={`badge badge-outline inline-flex items-center gap-2 text-base-content ${badge} ${className}`.trim()}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${dot} ${
          hasPulse ? 'animate-pulse motion-reduce:animate-none' : ''
        }`}
      />
      {label}
    </span>
  );
}