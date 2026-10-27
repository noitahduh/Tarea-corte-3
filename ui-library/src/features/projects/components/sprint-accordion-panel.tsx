export interface SprintTask {
  description: string;
  isDone: boolean;
}

export type SprintStatus = 'completed' | 'in_progress' | 'pending';

export interface SprintPhase {
  sprintNumber: number;
  title: string;
  status: SprintStatus;
  tasks: SprintTask[];
  isDefaultOpen?: boolean;
}

export interface SprintAccordionPanelProps {
  sprints: SprintPhase[];
}

const statusConfig: Record<SprintStatus, { label: string; badge: string }> = {
  completed: { label: 'Completado', badge: 'badge-success' },
  in_progress: { label: 'En progreso', badge: 'badge-accent' },
  pending: { label: 'Pendiente', badge: 'badge-ghost' },
};

export function SprintAccordionPanel({ sprints }: SprintAccordionPanelProps) {
  if (sprints.length === 0) return null;

  return (
    <div className="join join-vertical w-full bg-base-100 shadow-sm">
      {sprints.map((sprint) => {
        const { label, badge } = statusConfig[sprint.status];

        return (
          <div
            key={sprint.sprintNumber}
            className="collapse collapse-arrow join-item border border-base-300"
          >
            <input
              type="radio"
              name="sprint-accordion"
              defaultChecked={sprint.isDefaultOpen}
              aria-label={`Sprint ${sprint.sprintNumber}: ${sprint.title} (${label})`}
            />
            <div className="collapse-title flex flex-wrap items-center gap-2 text-sm font-semibold sm:text-base">
              <span
                className={`badge badge-sm ${
                  sprint.status === 'completed' ? 'badge-primary' : 'badge-outline'
                }`}
              >
                Sprint {sprint.sprintNumber}
              </span>
              <span className="order-last w-full sm:order-none sm:w-auto sm:min-w-0 sm:flex-1">
                {sprint.title}
              </span>
              <span className={`badge badge-sm ${badge}`}>{label}</span>
            </div>
            <div className="collapse-content text-sm">
              <ul className="flex flex-col gap-1 border-t border-base-300 pt-3">
                {sprint.tasks.map((task) => (
                  <li key={task.description} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className={task.isDone ? 'text-primary' : 'text-base-content/50'}
                    >
                      {task.isDone ? '✓' : '○'}
                    </span>
                    <span className={task.isDone ? '' : 'text-base-content/70'}>
                      {task.description}
                      <span className="sr-only">
                        {task.isDone ? ' (hecha)' : ' (pendiente)'}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
