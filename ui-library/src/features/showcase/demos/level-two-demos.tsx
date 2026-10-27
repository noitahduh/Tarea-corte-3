import type { ReactNode } from 'react';
import { AdvisorChatBubble } from '@/features/advising/components/advisor-chat-bubble';
import { BoltIcon, BookIcon } from '@/features/showcase/components/demo-icons';
import { AnalyticsBentoGrid } from '@/shared/components/ui/analytics-bento-grid';
import { StepProgressTracker } from '@/shared/components/ui/step-progress-tracker';
import { TagFilterGroup } from '@/shared/components/ui/tag-filter-group';
import { CourseCardsDemo } from './course-cards-demo';
import { StudentTableDemo } from './student-table-demo';
import { ToastDemo } from './toast-demo';

export const levelTwoDemos: Record<number, ReactNode> = {
  8: <CourseCardsDemo />,
  9: (
    <AnalyticsBentoGrid
      stats={[
        {
          label: 'Créditos aprobados',
          value: 118,
          total: 160,
          description: '74 % de la carrera',
          icon: <BookIcon className="size-8" />,
        },
        {
          label: 'Sprints completados',
          value: 11,
          total: 14,
          description: 'Semana 11 en curso',
          icon: <BoltIcon className="size-8" />,
          colorVariant: 'secondary',
        },
      ]}
    />
  ),
  10: <ToastDemo />,
  11: (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-2 rounded-box border border-base-300 bg-base-100 p-3 sm:p-4">
      <AdvisorChatBubble
        senderName="Mariana Zapata"
        senderRole="Estudiante"
        message="Profesor, ¿la directiva 'use client' es necesaria si solo uso Tailwind y no tengo hooks?"
        timestamp="10:42"
        avatarUrl=""
      />
      <AdvisorChatBubble
        senderName="Prof. Andrés Caicedo"
        senderRole="Docente"
        message="No. Tailwind se procesa al compilar. Deja el componente en el servidor para no enviar JavaScript extra al cliente."
        timestamp="10:45"
        avatarUrl=""
        isSenderTeacher
        deliveryStatus="delivered"
      />
    </div>
  ),
  12: <StudentTableDemo />,
  13: (
    <div className="rounded-box border border-base-300 bg-base-100 p-4">
      <StepProgressTracker
        steps={[
          { label: 'Propuesta', isCompleted: true },
          { label: 'Sprint 1', isCompleted: true },
          { label: 'Sprint 2 (hoy)', isCompleted: false, isCurrent: true },
          { label: 'Demo final', isCompleted: false, stepNumber: 'F' },
        ]}
      />
    </div>
  ),
  14: (
    <div className="mx-auto w-full max-w-xl rounded-box border border-base-300 bg-base-100 p-4">
      <TagFilterGroup
        title="Filtros de asignatura"
        tags={[
          { id: 'server-components', name: 'Server Components', isSelected: true },
          { id: 'tailwind', name: 'Tailwind CSS', isSelected: true },
          { id: 'daisyui-themes', name: 'Temas de daisyUI', isSelected: false },
          { id: 'server-actions', name: 'Server Actions', isSelected: false },
        ]}
      />
    </div>
  ),
};
