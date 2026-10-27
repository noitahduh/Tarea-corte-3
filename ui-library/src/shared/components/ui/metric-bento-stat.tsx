import type { ReactNode } from 'react';

export type MetricTrendType = 'positive' | 'negative' | 'neutral';

export interface MetricBentoStatProps {
  title: string;
  value: string | number;
  maxValue?: string | number;
  trendText?: string;
  trendType?: MetricTrendType;
  icon: ReactNode;
}

const trendClasses: Record<MetricTrendType, string> = {
  positive: 'badge-success',
  negative: 'badge-error',
  neutral: 'badge-ghost',
};

const trendSymbols: Record<MetricTrendType, string> = {
  positive: '▲',
  negative: '▼',
  neutral: '–',
};

export function MetricBentoStat({
  title,
  value,
  maxValue,
  trendText,
  trendType = 'neutral',
  icon,
}: MetricBentoStatProps) {
  return (
    <div className="stats w-full border border-base-300 bg-base-100 shadow-sm">
      <div className="stat">
        <div className="stat-figure">
          <span
            className="flex rounded-box bg-primary/10 p-2 text-primary"
            aria-hidden="true"
          >
            {icon}
          </span>
        </div>
        <div className="stat-title whitespace-normal">{title}</div>
        <div className="stat-value text-primary">
          {value}
          {maxValue !== undefined ? (
            <span className="text-base font-normal text-base-content/60">
              {' '}
              / {maxValue}
            </span>
          ) : null}
        </div>
        {trendText ? (
          <div className="stat-desc mt-1 whitespace-normal">
            <span
              className={`badge badge-sm h-auto py-0.5 text-start ${trendClasses[trendType]}`}
            >
              <span aria-hidden="true">{trendSymbols[trendType]}</span>
              {trendText}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}