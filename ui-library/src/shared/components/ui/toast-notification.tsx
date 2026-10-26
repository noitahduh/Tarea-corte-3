export type ToastVariant = 'success' | 'info' | 'warning' | 'error';

export interface ToastNotificationProps {
  title: string;
  message: string;
  variant?: ToastVariant;
  onClose?: () => void;
}

const variantClasses: Record<ToastVariant, string> = {
  success: 'alert-success',
  info: 'alert-info',
  warning: 'alert-warning',
  error: 'alert-error',
};

export function ToastNotification({
  title,
  message,
  variant = 'success',
  onClose,
}: ToastNotificationProps) {
  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';

  return (
    <div className="toast toast-top toast-end z-50">
      <div
        role={role}
        className={`alert ${variantClasses[variant]} w-full max-w-xs shadow-lg sm:max-w-sm`}
      >
        <div className="min-w-0">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm wrap-break-word">{message}</p>
        </div>
        {onClose ? (
          <button
            type="button"
            className="btn btn-xs btn-ghost text-inherit"
            onClick={onClose}
            aria-label={`Cerrar notificación: ${title}`}
          >
            ✕
          </button>
        ) : null}
      </div>
    </div>
  );
}