export type ShowcaseLevelId = 'nivel-1' | 'nivel-2' | 'nivel-3';

export interface ShowcaseLevel {
  id: ShowcaseLevelId;
  title: string;
  description: string;
}

export interface ShowcaseEntry {
  number: number;
  title: string;
  description: string;
  filePath: string;
  level: ShowcaseLevelId;
}

export const showcaseLevels: ShowcaseLevel[] = [
  {
    id: 'nivel-1',
    title: 'Nivel 1: Átomos',
    description: 'Elementos de un solo propósito, muy reutilizables y con pocas dependencias.',
  },
  {
    id: 'nivel-2',
    title: 'Nivel 2: Moléculas',
    description: 'Combinaciones de átomos que resuelven una tarea concreta de la interfaz.',
  },
  {
    id: 'nivel-3',
    title: 'Nivel 3: Organismos',
    description: 'Secciones completas que agrupan varias moléculas con su propia lógica.',
  },
];

export const showcaseCatalog: ShowcaseEntry[] = [
  {
    number: 1,
    title: 'Botón de Acción con Estado de Carga y Badge',
    description: 'Botón con icono, insignia y estado de carga que bloquea clics repetidos.',
    filePath: 'src/shared/components/ui/action-button.tsx',
    level: 'nivel-1',
  },
  {
    number: 2,
    title: 'Insignia de Estado Tonal con Indicador Luminoso',
    description: 'Píldora con punto de color que comunica el estado de un trámite académico.',
    filePath: 'src/shared/components/ui/status-badge.tsx',
    level: 'nivel-1',
  },
  {
    number: 3,
    title: 'Banner de Alerta Informativa Institucional',
    description: 'Aviso con icono, título, descripción y una acción secundaria.',
    filePath: 'src/shared/components/ui/alert-banner.tsx',
    level: 'nivel-1',
  },
  {
    number: 4,
    title: 'Avatar de Usuario con Anillo de Presencia y Rol',
    description: 'Avatar con indicador de presencia, rol, programa y ubicación.',
    filePath: 'src/shared/components/ui/user-avatar.tsx',
    level: 'nivel-1',
  },
  {
    number: 5,
    title: 'Píldora de Atajo de Teclado con Kbd',
    description: 'Fila con la descripción de la acción y sus teclas en elementos kbd.',
    filePath: 'src/shared/components/ui/shortcut-pill.tsx',
    level: 'nivel-1',
  },
  {
    number: 6,
    title: 'Indicador de Calificación por Estrellas',
    description: 'Calificación con medias estrellas, puntaje y número de evaluaciones.',
    filePath: 'src/shared/components/ui/rating-display.tsx',
    level: 'nivel-1',
  },
  {
    number: 7,
    title: 'Caja Bento de Métrica Académica',
    description: 'Métrica principal con valor máximo, tendencia e icono.',
    filePath: 'src/shared/components/ui/metric-bento-stat.tsx',
    level: 'nivel-1',
  },
  {
    number: 8,
    title: 'Tarjeta de Asignatura con Barra de Progreso',
    description: 'Resumen de la asignatura con cabecera en degradado, avance y accesos.',
    filePath: 'src/features/courses/components/course-card.tsx',
    level: 'nivel-2',
  },
  {
    number: 9,
    title: 'Panel de Analítica Bento Multi-Métrica',
    description: 'Varias métricas en un solo bloque con divisores e iconos.',
    filePath: 'src/shared/components/ui/analytics-bento-grid.tsx',
    level: 'nivel-2',
  },
  {
    number: 10,
    title: 'Notificación Flotante Estilo Toast Institucional',
    description: 'Notificación flotante que el componente padre monta y desmonta.',
    filePath: 'src/shared/components/ui/toast-notification.tsx',
    level: 'nivel-2',
  },
  {
    number: 11,
    title: 'Globo de Conversación de Asesoría Académica',
    description: 'Mensajes de asesoría: el estudiante a la izquierda y el docente a la derecha.',
    filePath: 'src/features/advising/components/advisor-chat-bubble.tsx',
    level: 'nivel-2',
  },
  {
    number: 12,
    title: 'Fila de Directorio Estudiantil con Menú de Acciones',
    description: 'Fila de tabla con avatar, código, programa, estado y acción.',
    filePath: 'src/features/students/components/student-table-row.tsx',
    level: 'nivel-2',
  },
  {
    number: 13,
    title: 'Rastreador de Hitos de Entrega por Pasos',
    description: 'Pasos de una entrega con el hito actual resaltado.',
    filePath: 'src/shared/components/ui/step-progress-tracker.tsx',
    level: 'nivel-2',
  },
  {
    number: 14,
    title: 'Selector de Etiquetas Temáticas con Checkboxes',
    description: 'Filtros con checkboxes ocultos que se pueden usar con teclado.',
    filePath: 'src/shared/components/ui/tag-filter-group.tsx',
    level: 'nivel-2',
  },
  {
    number: 15,
    title: 'Tarjeta de Evento o Hackathon con Cuenta Regresiva',
    description: 'Convocatoria con cupos, fecha, lugar y reloj de cuenta regresiva.',
    filePath: 'src/features/events/components/event-countdown-card.tsx',
    level: 'nivel-3',
  },
  {
    number: 16,
    title: 'Barra de Navegación de Aplicación con Menú de Usuario',
    description: 'Cabecera con logo, período, notificaciones y menú del usuario.',
    filePath: 'src/shared/components/ui/academic-app-navbar.tsx',
    level: 'nivel-3',
  },
  {
    number: 17,
    title: 'Formulario Modular de Solicitud de Tutoría',
    description: 'Formulario que envía la solicitud mediante una Server Action.',
    filePath: 'src/features/tutoring/components/tutoring-request-form.tsx',
    level: 'nivel-3',
  },
  {
    number: 18,
    title: 'Diálogo Modal de Confirmación de Entrega',
    description: 'Diálogo nativo que pide confirmación antes de una entrega irreversible.',
    filePath: 'src/shared/components/ui/submission-confirm-modal.tsx',
    level: 'nivel-3',
  },
  {
    number: 19,
    title: 'Tarjeta de Perfil Docente con Pestañas y Horarios',
    description: 'Perfil docente con pestañas de asignaturas, asesorías y publicaciones.',
    filePath: 'src/features/faculty/components/faculty-profile-card.tsx',
    level: 'nivel-3',
  },
  {
    number: 20,
    title: 'Tablero de Entregables de Sprint en Acordeón Colapsable',
    description: 'Acordeón de sprints hecho solo con CSS mediante botones de radio.',
    filePath: 'src/features/projects/components/sprint-accordion-panel.tsx',
    level: 'nivel-3',
  },
];

export function formatShowcaseNumber(number: number): string {
  return String(number).padStart(2, '0');
}
