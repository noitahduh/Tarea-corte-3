'use client';

import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

export interface FacultyTabContent {
  id: string;
  label: string;
  content: ReactNode;
}

export interface FacultyProfileTabsProps {
  tabs: FacultyTabContent[];
  ariaLabel: string;
}

export function FacultyProfileTabs({ tabs, ariaLabel }: FacultyProfileTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  if (tabs.length === 0) return null;

  function activateTab(index: number) {
    const next = (index + tabs.length) % tabs.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const targets: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    const target = targets[event.key];
    if (target === undefined) return;
    event.preventDefault();
    activateTab(target);
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="tabs tabs-box tabs-sm flex-wrap gap-1 rounded-xl sm:tabs-md"
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`tab flex-auto px-3 whitespace-nowrap ${
                isActive ? 'tab-active bg-primary font-semibold text-primary-content' : ''
              }`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={index !== activeIndex}
          tabIndex={0}
          className="rounded-xl border border-base-300 bg-base-200/50 p-4 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
