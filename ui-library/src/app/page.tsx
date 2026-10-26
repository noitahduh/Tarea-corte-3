'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CourseCard,
  type CourseCardProps,
} from '@/features/courses/components/course-card';
import { ActionButton } from '@/shared/components/ui/action-button';
import { AlertBanner } from '@/shared/components/ui/alert-banner';
import {
  StepProgressTracker,
  type StepItem,
} from '@/shared/components/ui/step-progress-tracker';
import {
  ToastNotification,
  type ToastVariant,
} from '@/shared/components/ui/toast-notification';

type DemoCourse = Pick<
  CourseCardProps,
  | 'courseCode'
  | 'title'
  | 'instructor'
  | 'room'
  | 'credits'
  | 'progressPercentage'
> & { hasSyllabus: boolean };

const courses: DemoCourse[] = [
  {
    courseCode: 'ISIS-2301',
    title: 'Desarrollo de aplicaciones web',
    instructor: 'Docente de ejemplo A',
    room: 'Aula 301',
    credits: 3,
    progressPercentage: 65,
    hasSyllabus: true,
  },
  {
    courseCode: 'PSI-1102',
    title: 'Métodos de investigación en psicología',
    instructor: 'Docente de ejemplo B',
    room: 'Aula 105',
    credits: 2,
    progressPercentage: 40,
    hasSyllabus: true,
  },
  {
    courseCode: 'EST-2010',
    title: 'Estadística aplicada',
    instructor: 'Docente de ejemplo C',
    room: 'Aula 214',
    credits: 3,
    progressPercentage: 85,
    hasSyllabus: false,
  },
];

const stageLabels = ['Planeación', 'Desarrollo', 'Revisión', 'Entrega'];

const toastDemos: Record<ToastVariant, { title: string; message: string }> = {
  success: {
    title: 'Guardado',
    message: 'Los cambios se guardaron correctamente.',
  },
  info: {
    title: 'Recordatorio',
    message: 'Tienes una sesión de asesoría mañana.',
  },
  warning: {
    title: 'Fecha cercana',
    message: 'La entrega cierra en menos de 24 horas.',
  },
  error: {
    title: 'No se pudo enviar',
    message: 'Revisa tu conexión e inténtalo de nuevo.',
  },
};

const toastVariants: ToastVariant[] = ['success', 'info', 'warning', 'error'];

const toastButtonLabels: Record<ToastVariant, string> = {
  success: 'Éxito',
  info: 'Información',
  warning: 'Advertencia',
  error: 'Error',
};

export default function Home() {
  // Botón de acción
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Banner
  const [showAlertDetail, setShowAlertDetail] = useState(false);

  // Tarjetas
  const [detailCode, setDetailCode] = useState(courses[0].courseCode);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  // Toast
  const [toastVariant, setToastVariant] = useState<ToastVariant | null>(null);

  // Rastreador
  const [currentStage, setCurrentStage] = useState(2);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  const detailCourse =
    courses.find((course) => course.courseCode === detailCode) ?? courses[0];

  const steps: StepItem[] = stageLabels.map((label, index) => ({
    label,
    isCompleted: index < currentStage,
    isCurrent: index === currentStage,
  }));

  function handleSave() {
    if (isSaving) return;
    setIsSaving(true);
    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(false);
      setToastVariant('success');
    }, 1500);
  }

  function toggleSelected(code: string) {
    setSelectedCodes((previous) =>
      previous.includes(code)
        ? previous.filter((item) => item !== code)
        : [...previous, code],
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-4 sm:p-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Biblioteca de componentes académicos
        </h1>
        <p className="text-base-content/80">
          Demostración interactiva de los componentes. Todo funciona dentro de
          esta página.
        </p>
      </header>

      <section className="flex flex-col gap-3" aria-labelledby="sec-botones">
        <h2 id="sec-botones" className="text-xl font-semibold">
          Botón de acción
        </h2>
        <div className="flex flex-wrap gap-2">
          <ActionButton label="Primario" variant="primary" badgeText="3" />
          <ActionButton label="Secundario" variant="secondary" badgeText="3" />
          <ActionButton label="Outline" variant="outline" />
          <ActionButton label="Ghost" variant="ghost" />
          <ActionButton label="Pequeño" size="sm" />
          <ActionButton label="Grande" size="lg" />
        </div>
        <div>
          <ActionButton
            label={isSaving ? 'Guardando…' : 'Guardar borrador'}
            isLoading={isSaving}
            onClick={handleSave}
          />
        </div>
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="sec-alerta">
        <h2 id="sec-alerta" className="text-xl font-semibold">
          Banner de alerta
        </h2>
        <AlertBanner
          type="warning"
          title="Fecha límite próxima"
          description="La entrega del corte 3 cierra el viernes a las 11:59 p. m."
          actionLabel={showAlertDetail ? 'Ocultar detalle' : 'Ver detalle'}
          onActionClick={() => setShowAlertDetail((previous) => !previous)}
        />
        {showAlertDetail ? (
          <p className="rounded-box bg-base-200 p-3 text-sm">
            Recuerda subir el repositorio y verificar que el README incluya la
            lista de componentes y los comandos de validación.
          </p>
        ) : null}
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="sec-cursos">
        <h2 id="sec-cursos" className="text-xl font-semibold">
          Tarjetas de asignatura
        </h2>
        <p className="text-sm">
          Asignaturas seleccionadas: {selectedCodes.length}
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.courseCode}
              courseCode={course.courseCode}
              title={course.title}
              instructor={course.instructor}
              room={course.room}
              credits={course.credits}
              progressPercentage={course.progressPercentage}
              courseUrl="#panel-aula"
              syllabusUrl={course.hasSyllabus ? '#panel-programa' : undefined}
              isSelected={selectedCodes.includes(course.courseCode)}
              onViewDetails={() => setDetailCode(course.courseCode)}
              onToggleSelect={() => toggleSelected(course.courseCode)}
              onLinkClick={() => setDetailCode(course.courseCode)}
            />
          ))}
        </div>

        <div
          id="detalle-asignatura"
          className="mt-2 flex flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-4"
        >
          <h3 className="text-lg font-semibold">
            Detalle: {detailCourse.title}
          </h3>
          <div id="panel-aula" className="scroll-mt-4 text-sm">
            <h4 className="font-semibold">Aula</h4>
            <p>
              {detailCourse.courseCode} · {detailCourse.room} ·{' '}
              {detailCourse.instructor}
            </p>
            <p>Avance registrado: {detailCourse.progressPercentage}%.</p>
          </div>
          <div id="panel-programa" className="scroll-mt-4 text-sm">
            <h4 className="font-semibold">Programa</h4>
            <p>
              {detailCourse.hasSyllabus
                ? `Asignatura de ${detailCourse.credits} créditos con programa disponible (contenido de ejemplo).`
                : 'Esta asignatura aún no tiene programa publicado.'}
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="sec-toast">
        <h2 id="sec-toast" className="text-xl font-semibold">
          Notificación Toast
        </h2>
        <div className="flex flex-wrap gap-2">
          {toastVariants.map((variant) => (
            <ActionButton
              key={variant}
              label={toastButtonLabels[variant]}
              variant="outline"
              size="sm"
              onClick={() => setToastVariant(variant)}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="sec-hitos">
        <h2 id="sec-hitos" className="text-xl font-semibold">
          Rastreador de hitos
        </h2>
        <StepProgressTracker steps={steps} />
        <div className="flex flex-wrap gap-2">
          <ActionButton
            label="Avanzar etapa"
            size="sm"
            disabled={currentStage >= stageLabels.length}
            onClick={() =>
              setCurrentStage((previous) =>
                Math.min(previous + 1, stageLabels.length),
              )
            }
          />
          <ActionButton
            label="Reiniciar"
            variant="outline"
            size="sm"
            onClick={() => setCurrentStage(0)}
          />
        </div>
      </section>

      {toastVariant ? (
        <ToastNotification
          title={toastDemos[toastVariant].title}
          message={toastDemos[toastVariant].message}
          variant={toastVariant}
          onClose={() => setToastVariant(null)}
        />
      ) : null}
    </main>
  );
}