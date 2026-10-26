import Link from 'next/link';

export type AlertBannerType = 'info' | 'success' | 'warning' | 'error';

export interface AlertBannerProps {
  title: string;
  description: string;
  type?: AlertBannerType;
  actionLabel?: string;
  onActionClick?: () => void;
  actionHref?: string;
}

const typeClasses: Record<AlertBannerType, string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
};

const iconPaths: Record<AlertBannerType, string> = {
  info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  warning:
    'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  error:
    'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
};

export function AlertBanner({
  title,
  description,
  type = 'info',
  actionLabel,
  onActionClick,
  actionHref,
}: AlertBannerProps) {
  const role = type === 'error' || type === 'warning' ? 'alert' : 'status';
  const actionClass = 'btn btn-xs btn-outline';

  let action: React.ReactNode = null;
  if (actionLabel) {
    if (actionHref) {
      action = (
        <Link href={actionHref} className={actionClass}>
          {actionLabel}
        </Link>
      );
    } else if (onActionClick) {
      action = (
        <button type="button" className={actionClass} onClick={onActionClick}>
          {actionLabel}
        </button>
      );
    }
  }

  return (
    <div
      role={role}
      className={`alert ${typeClasses[type]} alert-vertical sm:alert-horizontal`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="h-6 w-6 shrink-0"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={iconPaths[type]}
        />
      </svg>
      <div className="min-w-0 text-left">
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm wrap-break-word">{description}</p>
      </div>
      {action}
    </div>
  );
}