import type { ReactNode } from 'react';

export type StatColorVariant = 'primary' | 'secondary';

export interface StatItem {
  label: string;
  value: number | string;
  total?: number | string;
  description: string;
  icon: ReactNode;
  colorVariant?: StatColorVariant;
}

export interface AnalyticsBentoGridProps {
  stats: StatItem[];
}

const variantClasses: Record<StatColorVariant, { value: string; figure: string }> = {
  primary: { value: 'text-base-content', figure: 'text-primary' },
  secondary: { value: 'text-secondary', figure: 'text-secondary' },
};

function formatValue(value: number | string): string {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? String(value) : '—';
  }
  return value;
}

export function AnalyticsBentoGrid({ stats }: AnalyticsBentoGridProps) {
  if (stats.length === 0) return null;

  return (
    <div className="stats stats-vertical w-full border border-base-300 bg-base-100 shadow-sm lg:stats-horizontal">
      {stats.map((stat) => {
        const colors = variantClasses[stat.colorVariant ?? 'primary'];

        return (
          <div key={stat.label} className="stat">
            <div className={`stat-figure ${colors.figure}`} aria-hidden="true">
              {stat.icon}
            </div>
            <div className="stat-title text-xs font-semibold tracking-wide text-base-content/70 uppercase">
              {stat.label}
            </div>
            <div className={`stat-value ${colors.value}`}>
              {formatValue(stat.value)}
              {stat.total !== undefined ? (
                <span className="text-base font-normal text-base-content/70">
                  {' '}
                  / {formatValue(stat.total)}
                </span>
              ) : null}
            </div>
            <div className="stat-desc text-base-content/70 whitespace-normal">
              {stat.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}
