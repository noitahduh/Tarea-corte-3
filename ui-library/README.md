# Biblioteca Icesi UI

Biblioteca de componentes académicos para la actividad de la semana 12 del curso Desarrollo de Entornos Digitales Web (Universidad Icesi). Se implementaron los 20 componentes de la guía: los 7 de la entrega mínima (01, 03, 08, 10, 13, 16 y 18) y los 13 restantes como bonificación.

La página principal (`src/app/page.tsx`) muestra los 20 componentes agrupados por nivel. Cada uno aparece con su número y su nombre, seguido de una demostración con datos académicos ficticios.

## Tecnologías

- Next.js 16 (App Router, Turbopack y Cache Components)
- React 19 y TypeScript
- Tailwind CSS v4, sin `tailwind.config.js`
- daisyUI 5 con un tema propio llamado `icesi`
- ESLint 9

## Requisitos

- Node.js 20.9 o superior
- npm

## Instalación

Desde la carpeta del proyecto, en PowerShell o en Git Bash:

```bash
npm install
```

## Ejecución

Servidor de desarrollo:

```bash
npm run dev
```

Luego abre http://localhost:3000 en el navegador.

Versión de producción:

```bash
npm run build
```

```bash
npm run start
```

## Validación

Ejecuta cada comando por separado:

```bash
npm run lint
```

```bash
npm run build
```

## Paleta y tema

El tema `icesi` está definido en `src/app/globals.css` y asigna la paleta institucional a los colores semánticos de daisyUI:

| Color | Hex | Token de daisyUI |
| --- | --- | --- |
| Azul Icesi | `#5454e9` | `primary` |
| Morado Icesi | `#865cf0` | `secondary` |
| Amarillo Icesi | `#e4eb60` | `accent` |
| Verde Icesi | `#4cb979` | `success` |
| Naranja Icesi | `#e9683b` | `warning` |

Los componentes usan solo esos tokens (`bg-primary`, `text-secondary`, `badge-success`, etc.): no hay colores hexadecimales en las clases ni estilos en línea.

## Componentes

### Nivel 1: Átomos

| # | Componente | Ruta | Propósito | Tipo |
| --- | --- | --- | --- | --- |
| 01 | Botón de Acción con Estado de Carga y Badge | [`src/shared/components/ui/action-button.tsx`](src/shared/components/ui/action-button.tsx) | Botón con icono, insignia y estado de carga que evita clics repetidos. | Server |
| 02 | Insignia de Estado Tonal con Indicador Luminoso | [`src/shared/components/ui/status-badge.tsx`](src/shared/components/ui/status-badge.tsx) | Píldora con un punto de color que indica el estado de un trámite. | Server |
| 03 | Banner de Alerta Informativa Institucional | [`src/shared/components/ui/alert-banner.tsx`](src/shared/components/ui/alert-banner.tsx) | Aviso con icono, título, descripción y una acción secundaria. | Server |
| 04 | Avatar de Usuario con Anillo de Presencia y Rol | [`src/shared/components/ui/user-avatar.tsx`](src/shared/components/ui/user-avatar.tsx) | Avatar con indicador de presencia, rol, programa y ubicación. | Server |
| 05 | Píldora de Atajo de Teclado con Kbd | [`src/shared/components/ui/shortcut-pill.tsx`](src/shared/components/ui/shortcut-pill.tsx) | Descripción de una acción con su combinación de teclas en `<kbd>`. | Server |
| 06 | Indicador de Calificación por Estrellas | [`src/shared/components/ui/rating-display.tsx`](src/shared/components/ui/rating-display.tsx) | Calificación con medias estrellas, puntaje y número de evaluaciones. | Server |
| 07 | Caja Bento de Métrica Académica | [`src/shared/components/ui/metric-bento-stat.tsx`](src/shared/components/ui/metric-bento-stat.tsx) | Métrica principal con valor máximo, tendencia e icono. | Server |

### Nivel 2: Moléculas

| # | Componente | Ruta | Propósito | Tipo |
| --- | --- | --- | --- | --- |
| 08 | Tarjeta de Asignatura con Barra de Progreso | [`src/features/courses/components/course-card.tsx`](src/features/courses/components/course-card.tsx) | Resumen de una asignatura con cabecera en degradado, avance y accesos. | Server |
| 09 | Panel de Analítica Bento Multi-Métrica | [`src/shared/components/ui/analytics-bento-grid.tsx`](src/shared/components/ui/analytics-bento-grid.tsx) | Varias métricas en un solo bloque, vertical en móvil y horizontal desde `lg`. | Server |
| 10 | Notificación Flotante Estilo Toast Institucional | [`src/shared/components/ui/toast-notification.tsx`](src/shared/components/ui/toast-notification.tsx) | Notificación flotante que el componente padre monta y desmonta. | Server |
| 11 | Globo de Conversación de Asesoría Académica | [`src/features/advising/components/advisor-chat-bubble.tsx`](src/features/advising/components/advisor-chat-bubble.tsx) | Mensaje de asesoría: estudiante a la izquierda y docente a la derecha. | Server |
| 12 | Fila de Directorio Estudiantil con Menú de Acciones | [`src/features/students/components/student-table-row.tsx`](src/features/students/components/student-table-row.tsx) | Fila `<tr>` con avatar, código, programa, estado y acción. | Server |
| 13 | Rastreador de Hitos de Entrega por Pasos | [`src/shared/components/ui/step-progress-tracker.tsx`](src/shared/components/ui/step-progress-tracker.tsx) | Pasos de una entrega con el hito actual resaltado. | Server |
| 14 | Selector de Etiquetas Temáticas con Checkboxes | [`src/shared/components/ui/tag-filter-group.tsx`](src/shared/components/ui/tag-filter-group.tsx) | Filtros con checkboxes ocultos y estilos `peer-checked`, usables con teclado. | Server |

### Nivel 3: Organismos

| # | Componente | Ruta | Propósito | Tipo |
| --- | --- | --- | --- | --- |
| 15 | Tarjeta de Evento o Hackathon con Cuenta Regresiva | [`src/features/events/components/event-countdown-card.tsx`](src/features/events/components/event-countdown-card.tsx) | Convocatoria con cupos, fecha, lugar y reloj de cuenta regresiva. | Server, con el reloj y el botón de inscripción como cliente |
| 16 | Barra de Navegación de Aplicación con Menú de Usuario | [`src/shared/components/ui/academic-app-navbar.tsx`](src/shared/components/ui/academic-app-navbar.tsx) | Cabecera con logo, período, notificaciones y menú del usuario. | Server, con el menú desplegable como cliente |
| 17 | Formulario Modular de Solicitud de Tutoría | [`src/features/tutoring/components/tutoring-request-form.tsx`](src/features/tutoring/components/tutoring-request-form.tsx) | Formulario que envía la solicitud mediante una Server Action. | Server |
| 18 | Diálogo Modal de Confirmación de Entrega | [`src/shared/components/ui/submission-confirm-modal.tsx`](src/shared/components/ui/submission-confirm-modal.tsx) | Diálogo nativo que pide confirmación antes de una entrega irreversible. | Client |
| 19 | Tarjeta de Perfil Docente con Pestañas y Horarios | [`src/features/faculty/components/faculty-profile-card.tsx`](src/features/faculty/components/faculty-profile-card.tsx) | Perfil docente con pestañas de asignaturas, asesorías y publicaciones. | Server, con el subpanel de pestañas como cliente |
| 20 | Tablero de Entregables de Sprint en Acordeón Colapsable | [`src/features/projects/components/sprint-accordion-panel.tsx`](src/features/projects/components/sprint-accordion-panel.tsx) | Acordeón de sprints hecho solo con CSS mediante botones de radio. | Server |

### Archivos de apoyo

| Archivo | Uso |
| --- | --- |
| [`src/shared/components/ui/navbar-user-menu.tsx`](src/shared/components/ui/navbar-user-menu.tsx) | Menú desplegable del componente 16 (cliente). |
| [`src/features/events/components/event-countdown-clock.tsx`](src/features/events/components/event-countdown-clock.tsx) | Reloj en vivo del componente 15 (cliente). |
| [`src/features/events/components/event-register-button.tsx`](src/features/events/components/event-register-button.tsx) | Botón de inscripción del componente 15 (cliente). |
| [`src/features/faculty/components/faculty-profile-tabs.tsx`](src/features/faculty/components/faculty-profile-tabs.tsx) | Pestañas del componente 19 (cliente). |
| [`src/features/tutoring/actions/submit-tutoring-request.ts`](src/features/tutoring/actions/submit-tutoring-request.ts) | Server Action que valida la solicitud del componente 17. |
| [`src/shared/lib/get-initials.ts`](src/shared/lib/get-initials.ts) | Iniciales para los avatares sin imagen. |
| `src/features/showcase/` | Catálogo, marco y demostraciones de la página principal. |

## Estructura

```text
src/
├── app/                      layout, página principal y tema
├── features/
│   ├── advising/             11
│   ├── courses/              08
│   ├── events/               15
│   ├── faculty/              19
│   ├── projects/             20
│   ├── showcase/             demostraciones de la página principal
│   ├── students/             12
│   └── tutoring/             17
└── shared/
    ├── components/ui/        01–07, 09, 10, 13, 14, 16 y 18
    └── lib/                  utilidades compartidas
```

Los componentes genéricos están en `src/shared/components/ui/` y los ligados a una funcionalidad en `src/features/<feature>/components/`. Cada componente tiene su archivo y exporta una interfaz de props tipada (`ActionButtonProps`, `CourseCardProps`, etc.).

## Decisiones técnicas

- **Server Components por defecto.** Solo llevan `'use client'` las partes que necesitan estado o APIs del navegador: el menú del navbar, el reloj y el botón del evento, las pestañas del perfil docente, el modal y las demostraciones interactivas.
- **Cuenta regresiva sin estilos en línea.** La clase `countdown` de daisyUI lee la variable `--value`. En lugar de `style={{ '--value': n }}`, `globals.css` genera las clases `[--value:0]` a `[--value:99]` con `@source inline("[--value:{0..99}]")`.
- **Contraste.** El verde, el naranja y el amarillo se usan como fondo de insignias con texto oscuro y no como color de texto sobre blanco, porque así no alcanzan el contraste mínimo de WCAG AA.
- **Sin enlaces externos.** Las acciones de la demostración son locales y la navegación usa anclas internas de la misma página. Los avatares muestran iniciales cuando `avatarUrl` está vacío.
- **Nombres de daisyUI 5 y Tailwind v4.** `avatar-online`, `tabs-box`, `fieldset`, `bg-linear-to-r` y `wrap-break-word`, en lugar de los nombres de versiones anteriores.
- **Acordeón sin JavaScript.** El componente 20 usa `input type="radio"` con `collapse collapse-arrow join-item`, sin `onClick` ni `useState`.
- **Formulario con Server Action.** El componente 17 usa `<form action={...}>` sin estado por campo. La acción solo valida los datos y los registra en la consola del servidor: no guarda nada.
