import type { ReactNode } from 'react';
import { EventCountdownCard } from '@/features/events/components/event-countdown-card';
import { FacultyProfileCard } from '@/features/faculty/components/faculty-profile-card';
import { SprintAccordionPanel } from '@/features/projects/components/sprint-accordion-panel';
import { submitTutoringRequest } from '@/features/tutoring/actions/submit-tutoring-request';
import { TutoringRequestForm } from '@/features/tutoring/components/tutoring-request-form';
import { AcademicAppNavbar } from '@/shared/components/ui/academic-app-navbar';
import { SubmissionModalDemo } from './submission-modal-demo';

export const levelThreeDemos: Record<number, ReactNode> = {
  15: (
    <div className="mx-auto w-full max-w-lg">
      <EventCountdownCard
        eventTitle="Next.js y daisyUI Dev Challenge"
        categoryTag="Hackathon Icesi 2026"
        spotsLeft={14}
        location="Auditorio principal"
        dateText="Viernes 6 de noviembre, 14:00 a 18:00"
        countdown={{ days: 4, hours: 12, minutes: 45 }}
      />
    </div>
  ),
  16: (
    <div className="rounded-box border border-base-300 bg-base-100">
      <AcademicAppNavbar
        brandName="Portal DEDW"
        user={{
          name: 'Sofía Montoya',
          avatarUrl: '',
          notificationsCount: 3,
          currentTerm: '2026-2',
        }}
      />
    </div>
  ),
  17: (
    <div className="mx-auto w-full max-w-lg">
      <TutoringRequestForm
        availableTopics={[
          { id: 'server-client', label: 'Next.js: límites entre servidor y cliente' },
          { id: 'tailwind-v4', label: 'Tailwind CSS v4 y temas de daisyUI' },
          { id: 'server-actions', label: 'Formularios con Server Actions' },
        ]}
        actionHandler={submitTutoringRequest}
      />
    </div>
  ),
  18: <SubmissionModalDemo />,
  19: (
    <div className="mx-auto w-full max-w-xl">
      <FacultyProfileCard
        fullName="Dr. Ricardo Salcedo"
        academicRole="Profesor titular · DEDW"
        department="Departamento de Tecnologías de Información"
        avatarUrl=""
        contactHref="#componente-17"
        tabs={[
          {
            id: 'asignaturas',
            label: 'Asignaturas',
            content: (
              <ul className="list-inside list-disc">
                <li>Desarrollo de entornos digitales web</li>
                <li>Arquitectura de software</li>
              </ul>
            ),
          },
          {
            id: 'asesoria',
            label: 'Asesorías',
            content: <p>Martes y jueves de 15:00 a 17:00 en el laboratorio del edificio L.</p>,
          },
          {
            id: 'publicaciones',
            label: 'Publicaciones',
            content: (
              <ul className="list-inside list-disc">
                <li>Componentes de servidor en aplicaciones académicas (2025)</li>
                <li>Diseño accesible con sistemas de temas (2024)</li>
              </ul>
            ),
          },
        ]}
      />
    </div>
  ),
  20: (
    <div className="mx-auto w-full max-w-2xl">
      <SprintAccordionPanel
        sprints={[
          {
            sprintNumber: 1,
            title: 'Arquitectura base y componentes atómicos',
            status: 'completed',
            isDefaultOpen: true,
            tasks: [
              { description: 'Configurar Next.js con App Router.', isDone: true },
              { description: 'Integrar Tailwind CSS y el tema de daisyUI.', isDone: true },
              { description: 'Crear átomos reutilizables: botones, badges y kbd.', isDone: true },
            ],
          },
          {
            sprintNumber: 2,
            title: 'Server Actions y formularios',
            status: 'in_progress',
            tasks: [
              { description: 'Formulario de tutoría con Server Action.', isDone: true },
              { description: 'Validación de campos en el servidor.', isDone: false },
            ],
          },
          {
            sprintNumber: 3,
            title: 'Pruebas y entrega final',
            status: 'pending',
            tasks: [
              { description: 'Revisión responsive desde 360 px.', isDone: false },
              { description: 'README con rutas de los componentes.', isDone: false },
            ],
          },
        ]}
      />
    </div>
  ),
};
