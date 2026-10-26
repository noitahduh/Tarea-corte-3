export interface StepItem {
  label: string;
  isCompleted: boolean;
  isCurrent?: boolean;
  stepNumber?: number;
}

export interface StepProgressTrackerProps {
  steps: StepItem[];
  ariaLabel?: string;
}

export function StepProgressTracker({
  steps,
  ariaLabel = 'Progreso de la entrega',
}: StepProgressTrackerProps) {
  if (steps.length === 0) return null;

  return (
    <ol
      className="steps steps-vertical w-full md:steps-horizontal"
      aria-label={ariaLabel}
    >
      {steps.map((step, index) => {
        const number = step.stepNumber ?? index + 1;
        const isCurrent = Boolean(step.isCurrent) && !step.isCompleted;
        const isReached = step.isCompleted || isCurrent;

        const statusText = step.isCompleted
          ? 'completado'
          : isCurrent
            ? 'paso actual'
            : 'pendiente';

        return (
          <li
            key={`${index}-${step.label}`}
            className={`step ${isReached ? 'step-primary' : ''}`}
            data-content={step.isCompleted ? '✓' : String(number)}
            aria-current={isCurrent ? 'step' : undefined}
          >
            <span className={isCurrent ? 'font-bold text-primary' : ''}>
              {step.label}
            </span>
            <span className="sr-only"> ({statusText})</span>
          </li>
        );
      })}
    </ol>
  );
}