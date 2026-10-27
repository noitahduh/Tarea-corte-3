'use client';

import { Fragment, useEffect, useState } from 'react';

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
}

export interface EventCountdownClockProps {
  countdown: CountdownValue;
}

const MINUTES_PER_DAY = 1440;
const MAX_MINUTES = 99 * MINUTES_PER_DAY + 23 * 60 + 59;

function toWholeNumber(value: number): number {
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function toTotalMinutes({ days, hours, minutes }: CountdownValue): number {
  const total =
    toWholeNumber(days) * MINUTES_PER_DAY +
    toWholeNumber(hours) * 60 +
    toWholeNumber(minutes);
  return Math.min(total, MAX_MINUTES);
}

export function EventCountdownClock({ countdown }: EventCountdownClockProps) {
  const [totalMinutes, setTotalMinutes] = useState(() => toTotalMinutes(countdown));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTotalMinutes((previous) => Math.max(previous - 1, 0));
    }, 60_000);
    return () => clearInterval(intervalId);
  }, []);

  const days = Math.floor(totalMinutes / MINUTES_PER_DAY);
  const hours = Math.floor((totalMinutes % MINUTES_PER_DAY) / 60);
  const minutes = totalMinutes % 60;

  const units = [
    { label: 'Días', value: days },
    { label: 'Horas', value: hours },
    { label: 'Min', value: minutes },
  ];

  return (
    <div className="rounded-box border border-base-300 bg-base-200/50 px-2 py-3">
      <p className="sr-only">
        Faltan {days} días, {hours} horas y {minutes} minutos
      </p>
      <div
        className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center text-center"
        aria-hidden="true"
      >
        {units.map((unit, index) => (
          <Fragment key={unit.label}>
            {index > 0 ? (
              <span className="text-xl font-bold text-base-content/40">:</span>
            ) : null}
            <div className="flex flex-col items-center gap-1">
              <span className="countdown font-mono text-2xl font-bold text-primary sm:text-3xl">
                <span className={`[--digits:2] [--value:${unit.value}]`}>
                  {String(unit.value).padStart(2, '0')}
                </span>
              </span>
              <span className="text-xs font-semibold text-base-content/70 uppercase">
                {unit.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
