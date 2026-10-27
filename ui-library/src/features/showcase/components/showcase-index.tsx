import Link from 'next/link';
import {
  formatShowcaseNumber,
  showcaseCatalog,
  showcaseLevels,
} from '@/features/showcase/data/showcase-catalog';

export function ShowcaseIndex() {
  return (
    <details className="collapse collapse-arrow border border-base-300 bg-base-100">
      <summary className="collapse-title font-semibold">
        Índice de los {showcaseCatalog.length} componentes
      </summary>
      <nav aria-label="Índice de componentes" className="collapse-content">
        <div className="grid gap-6 md:grid-cols-3">
          {showcaseLevels.map((level) => (
            <div key={level.id} className="flex flex-col gap-2">
              <Link href={`#${level.id}`} className="link link-hover font-semibold text-primary">
                {level.title}
              </Link>
              <ol className="flex flex-col gap-1 text-sm">
                {showcaseCatalog
                  .filter((entry) => entry.level === level.id)
                  .map((entry) => {
                    const label = formatShowcaseNumber(entry.number);
                    return (
                      <li key={entry.number}>
                        <Link href={`#componente-${label}`} className="link link-hover">
                          {label}. {entry.title}
                        </Link>
                      </li>
                    );
                  })}
              </ol>
            </div>
          ))}
        </div>
      </nav>
    </details>
  );
}
