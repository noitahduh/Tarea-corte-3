import { Fragment } from 'react';

export interface ShortcutPillProps {
  label: string;
  keys: string[];
}

export function ShortcutPill({ label, keys }: ShortcutPillProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-box border border-base-300 bg-base-100 px-3 py-2">
      <span className="min-w-0 text-sm wrap-break-word">{label}</span>
      <span className="flex shrink-0 flex-wrap items-center justify-end gap-1">
        {keys.map((key, index) => (
          <Fragment key={`${index}-${key}`}>
            {index > 0 ? (
              <span aria-hidden="true" className="text-xs text-base-content/60">
                +
              </span>
            ) : null}
            <kbd className="kbd kbd-sm border-base-300 bg-base-200">{key}</kbd>
          </Fragment>
        ))}
      </span>
    </div>
  );
}