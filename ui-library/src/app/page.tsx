'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CourseCard,
  type CourseCardProps,
} from '@/features/courses/components/course-card';
import {
  AcademicAppNavbar,
  type NavLinkItem,
  type UserSessionData,
} from '@/shared/components/ui/academic-app-navbar';
import {
  ActionButton,
  type ActionButtonVariant,
} from '@/shared/components/ui/action-button';
import { AlertBanner } from '@/shared/components/ui/alert-banner';
import { MetricBentoStat } from '@/shared/components/ui/metric-bento-stat';
import { RatingDisplay } from '@/shared/components/ui/rating-display';
import { ShortcutPill } from '@/shared/components/ui/shortcut-pill';
import { StatusBadge } from '@/shared/components/ui/status-badge';
import { StepProgressTracker } from '@/shared/components/ui/step-progress-tracker';
import { SubmissionConfirmModal } from '@/shared/components/ui/submission-confirm-modal';
import {
  ToastNotification,
  type ToastVariant,
} from '@/shared/components/ui/toast-notification';
import { UserAvatar } from '@/shared/components/ui/user-avatar';

type CourseData = Pick<
  CourseCardProps,
  | 'courseCode'
  | 'title'
  | 'instructor'
  | 'room'
  | 'credits'
  | 'progressPercentage'
  | 'courseUrl'
  | 'syllabusUrl'
>;

const courses: CourseData[] = [
  {
    courseCode: 'ISIS-2301',
    title: 'Desarrollo de aplicaciones web',
    instructor: 'Docente de ejemplo A',
    room: 'Aula 301',
    credits: 3,
    progressPercentage: 65,
    courseUrl: '#detalle-asignatura',
    syllabusUrl: '#detalle-asignatura',
  },
  {
    courseCode: 'PSI-1102',
    title: 'Métodos de investigación en psicología',
    instructor: 'Docente de ejemplo B',
    room: 'Aula 105',
    credits: 2,
    progressPercentage: 40,
    courseUrl: '#detalle-asignatura',
    syllabusUrl: '#detalle-asignatura',
  },
  {
    courseCode: 'EST-2010',
    title: 'Estadística aplicada',
    instructor: 'Docente de ejemplo C',
    room: 'Aula 214',
    credits: 3,
    progressPercentage: 85,
    courseUrl: '#detalle-asignatura',
  },
];

const navLinks: NavLinkItem[] = [
  { label: 'Nivel 1', href: '#nivel-1' },
  { label: 'Nivel 2', href: '#nivel-2' },
  { label: 'Nivel 3', href: '#nivel-3' },
];

const user: UserSessionData = {
  name: 'Estudiante de ejemplo',
  avatarUrl: '',
  notificationsCount: 3,
  currentTerm: '2026-2',
};

const buttonDemos: { variant: ActionButtonVariant; label: string }[] = [
  { variant: 'primary', label: 'Primario' },
  { variant: 'secondary', label: 'Secundario' },
  { variant: 'outline', label: 'Outline' },
  { variant: 'ghost', label: 'Ghost' },
];

const toastDemos: Record<
  ToastVariant,
  { button: string; title: string; message: string }
> = {
  success: {
    button: 'Éxito',
    title: 'Guardado',
    message: 'Los cambios se guardaron correctamente.',
  },
  info: {
    button: 'Información',
    title: 'Recordatorio',
    message: 'Tienes una sesión de asesoría mañana.',
  },
  warning: {
    button: 'Advertencia',
    title: 'Fecha cercana',
    message: 'La entrega cierra en menos de 24 horas.',
  },
  error: {
    button: 'Error',
    title: 'No se pudo enviar',
    message: 'Revisa tu conexión e inténtalo de nuevo.',
  },
};

const stageLabels = ['Planeación', 'Desarrollo', 'Revisión', 'Entrega'];

export default function Home() {
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showAlertDetail, setShowAlertDetail] = useState(false);
  const [isStudentOnline, setIsStudentOnline] = useState(true);
  const [detailCode, setDetailCode] = useState(courses[0].courseCode);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [toastVariant, setToastVariant] = useState<ToastVariant | null>(null);
  const [currentStage, setCurrentStage] = useState(2);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<
    'confirmed' | 'cancelled' | null
  >(null);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  const detailCourse =
    courses.find((course) => course.courseCode === detailCode) ?? courses[0];

  const steps = stageLabels.map((label, index) => ({
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

  function closeModal(result: 'confirmed' | 'cancelled') {
    setIsModalOpen(false);
    setSubmissionResult(result);
    if (result === 'confirmed') setCurrentStage(stageLabels.length);
  }

  return (
    <>
      <AcademicAppNavbar
        brandName="Biblioteca Icesi UI"
        user={user}
        links={navLinks}
        onNotificationsClick={() => setToastVariant('info')}
      />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 p-4 sm:p-6">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Biblioteca de componentes académicos
          </h1>
          <p className="text-base-content/80">
            Demostración interactiva. Todo funciona dentro de esta página; la
            barra de navegación está arriba.
          </p>
        </header>

        <section id="nivel-1" className="flex scroll-mt-4 flex-col gap-6">
          <h2 className="text-2xl font-semibold">Nivel 1: átomos visuales</h2>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Botón de acción</h3>
            <div className="flex flex-wrap gap-2">
              {buttonDemos.map(({ variant, label }) => (
                <ActionButton
                  key={variant}
                  label={label}
                  variant={variant}
                  badgeText="3"
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <ActionButton label="Pequeño" size="sm" variant="outline" />
              <ActionButton label="Mediano" size="md" variant="outline" />
              <ActionButton label="Grande" size="lg" variant="outline" />
            </div>
            <div>
              <ActionButton
                label={isSaving ? 'Guardando…' : 'Guardar borrador'}
                isLoading={isSaving}
                onClick={handleSave}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Banner de alerta</h3>
            <AlertBanner
              type="warning"
              title="Fecha límite próxima"
              description="La entrega del corte 3 cierra el viernes a las 11:59 p. m."
              actionLabel={showAlertDetail ? 'Ocultar detalle' : 'Ver detalle'}
              onActionClick={() => setShowAlertDetail((previous) => !previous)}
            />
            {showAlertDetail ? (
              <p className="rounded-box bg-base-200 p-3 text-sm">
                Verifica que el repositorio y el README estén completos antes
                de entregar.
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Insignias y avatar</h3>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="active" label="Matriculado" hasPulse />
              <StatusBadge status="pending" label="Pago pendiente" />
              <StatusBadge status="danger" label="Mora académica" hasPulse />
              <StatusBadge status="neutral" label="Inactivo" />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <UserAvatar
                name="Estudiante de ejemplo"
                role="Estudiante"
                program="Psicología"
                avatarUrl=""
                isOnline={isStudentOnline}
                locationText="Cali, Colombia"
                size="lg"
              />
              <ActionButton
                label={isStudentOnline ? 'Poner desconectado' : 'Poner en línea'}
                variant="outline"
                size="sm"
                onClick={() => setIsStudentOnline((previous) => !previous)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Atajos y calificación</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              <ShortcutPill label="Abrir buscador" keys={['Ctrl', 'K']} />
              <ShortcutPill
                label="Guardar borrador"
                keys={['Ctrl', 'Shift', 'S']}
              />
            </div>
            <RatingDisplay score={4.5} totalReviews={128} />
            <RatingDisplay score={3.2} showScoreText={false} />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Métricas</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricBentoStat
                title="Promedio acumulado"
                value="4.2"
                maxValue="5.0"
                trendText="+0.3 este semestre"
                trendType="positive"
                icon={<span className="text-3xl">🎓</span>}
              />
              <MetricBentoStat
                title="Créditos aprobados"
                value={86}
                maxValue={160}
                trendText="Sin cambios"
                trendType="neutral"
                icon={<span className="text-3xl">📚</span>}
              />
            </div>
          </div>
        </section>

        <section id="nivel-2" className="flex scroll-mt-4 flex-col gap-6">
          <h2 className="text-2xl font-semibold">Nivel 2: moléculas</h2>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Tarjetas de asignatura</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.courseCode}
                  {...course}
                  isSelected={selectedCodes.includes(course.courseCode)}
                  onViewDetails={() => setDetailCode(course.courseCode)}
                  onToggleSelect={() => toggleSelected(course.courseCode)}
                  onLinkClick={() => setDetailCode(course.courseCode)}
                />
              ))}
            </div>
            <div
              id="detalle-asignatura"
              className="scroll-mt-4 rounded-box border border-base-300 bg-base-100 p-4 text-sm"
            >
              <h4 className="text-base font-semibold">
                {detailCourse.courseCode} · {detailCourse.title}
              </h4>
              <p>
                {detailCourse.room} · {detailCourse.instructor} ·{' '}
                {detailCourse.credits} créditos
              </p>
              <p>
                {detailCourse.syllabusUrl
                  ? 'Programa disponible (contenido de ejemplo).'
                  : 'Esta asignatura aún no tiene programa publicado.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Notificación Toast</h3>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(toastDemos) as ToastVariant[]).map((variant) => (
                <ActionButton
                  key={variant}
                  label={toastDemos[variant].button}
                  variant="outline"
                  size="sm"
                  onClick={() => setToastVariant(variant)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Rastreador de hitos</h3>
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
                onClick={() => {
                  setCurrentStage(0);
                  setSubmissionResult(null);
                }}
              />
            </div>
          </div>
        </section>

        <section id="nivel-3" className="flex scroll-mt-4 flex-col gap-6">
          <h2 className="text-2xl font-semibold">Nivel 3: organismos</h2>

          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Confirmación de entrega</h3>
            <div>
              <ActionButton
                label="Entregar trabajo"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            {submissionResult ? (
              <AlertBanner
                type={submissionResult === 'confirmed' ? 'success' : 'info'}
                title={
                  submissionResult === 'confirmed'
                    ? 'Entrega registrada'
                    : 'Entrega cancelada'
                }
                description={
                  submissionResult === 'confirmed'
                    ? 'Tu trabajo fue entregado y el rastreador de hitos quedó completo.'
                    : 'No se entregó nada. Puedes volver a intentarlo cuando quieras.'
                }
              />
            ) : null}
          </div>
        </section>
      </main>

      <SubmissionConfirmModal
        isOpen={isModalOpen}
        assignmentName="Corte 3: Biblioteca de componentes"
        warningMessage="Verifica que el repositorio y el README estén completos antes de entregar."
        onConfirm={() => closeModal('confirmed')}
        onCancel={() => closeModal('cancelled')}
      />

      {toastVariant ? (
        <ToastNotification
          title={toastDemos[toastVariant].title}
          message={toastDemos[toastVariant].message}
          variant={toastVariant}
          onClose={() => setToastVariant(null)}
        />
      ) : null}
    </>
  );
}