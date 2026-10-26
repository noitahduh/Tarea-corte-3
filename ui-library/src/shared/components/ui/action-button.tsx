import type { ReactNode } from 'react';

export type ActionButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ActionButtonSize = 'sm' | 'md' | 'lg';

export interface ActionButtonProps {
  label: string;
  icon?: ReactNode;
  badgeText?: string;
  isLoading?: boolean;
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const variantClasses: Record<ActionButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline btn-primary',
  ghost: 'btn-ghost',
};

const sizeClasses: Record<ActionButtonSize, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
};

export function ActionButton({
  label,
  icon,
  badgeText,
  isLoading = false,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  onClick,
}: ActionButtonProps) {
  const badgeClass =
    variant === 'secondary' ? 'badge-accent' : 'badge-secondary';

  return (
    <button
      type={type}
      className={`btn max-w-full ${variantClasses[variant]} ${sizeClasses[size]}`}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <span className="loading loading-spinner" aria-hidden="true" />
      ) : (
        icon
      )}
      <span className="truncate">{label}</span>
      {badgeText ? (
        <span className={`badge badge-sm ${badgeClass}`}>{badgeText}</span>
      ) : null}
    </button>
  );
}