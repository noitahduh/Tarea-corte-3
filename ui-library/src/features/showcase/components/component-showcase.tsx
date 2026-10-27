import type { ReactNode } from 'react';
import {
  formatShowcaseNumber,
  type ShowcaseEntry,
} from '@/features/showcase/data/showcase-catalog';

export interface ComponentShowcaseProps {
  entry: ShowcaseEntry;
  children: ReactNode;
}

export function ComponentShowcase({ entry, children }: ComponentShowcaseProps) {
  const label = formatShowcaseNumber(entry.number);
  const headingId = `componente-${label}-titulo`;

  return (
    <section
      id={`componente-${label}`}
      aria-labelledby={headingId}
      className="flex scroll-mt-4 flex-col gap-3"
    >
      <div className="flex flex-col gap-1">
        <h3 id={headingId} className="text-xl font-bold wrap-break-word sm:text-2xl">
          {label}. {entry.title}
        </h3>
        <p className="text-sm text-base-content/80">{entry.description}</p>
      </div>

      <div className="rounded-box border border-base-300 bg-base-200/60 shadow-sm">
        <div className="flex items-center gap-2 rounded-t-box border-b border-base-300 bg-base-100 px-4 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-3 rounded-full bg-warning" />
            <span className="size-3 rounded-full bg-accent" />
            <span className="size-3 rounded-full bg-success" />
          </span>
          <span className="ms-1 text-xs font-semibold">Componente #{label}</span>
          <code className="ms-auto hidden truncate rounded-field bg-primary/10 px-2 py-0.5 text-xs text-primary md:inline">
            {entry.filePath}
          </code>
        </div>
        <div className="p-4 sm:p-6">{children}</div>
      </div>
    </section>
  );
}
