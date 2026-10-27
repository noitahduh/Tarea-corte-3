import type { ReactNode } from 'react';
import { BadgeCheckIcon, BookIcon } from '@/features/showcase/components/demo-icons';
import { MetricBentoStat } from '@/shared/components/ui/metric-bento-stat';
import { RatingDisplay } from '@/shared/components/ui/rating-display';
import { ShortcutPill } from '@/shared/components/ui/shortcut-pill';
import { StatusBadge } from '@/shared/components/ui/status-badge';
import { UserAvatar } from '@/shared/components/ui/user-avatar';
import { ActionButtonDemo } from './action-button-demo';
import { AlertBannerDemo } from './alert-banner-demo';

export const levelOneDemos: Record<number, ReactNode> = {
  1: <ActionButtonDemo />,
  2: (
    <div className="flex flex-wrap justify-center gap-2">
      <StatusBadge status="active" label="Matriculado activo" hasPulse />
      <StatusBadge status="pending" label="Requisito pendiente" hasPulse />
      <StatusBadge status="danger" label="Bloqueo financiero" />
      <StatusBadge status="neutral" label="Retiro voluntario" />
    </div>
  ),
  3: <AlertBannerDemo />,
  4: (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="rounded-box border border-base-300 bg-base-100 p-4">
        <UserAvatar
          name="Valentina Cuéllar"
          role="Monitora"
          program="Ingeniería Telemática · 7.º semestre"
          avatarUrl=""
          isOnline
          locationText="Disponible en la sala C-201"
        />
      </div>
      <div className="rounded-box border border-base-300 bg-base-100 p-4">
        <UserAvatar
          name="Santiago Lerma"
          role="Estudiante"
          program="Diseño de Medios Interactivos"
          avatarUrl=""
          locationText="Última conexión: ayer"
          size="sm"
        />
      </div>
    </div>
  ),
  5: (
    <div className="mx-auto flex w-full max-w-md flex-col gap-2">
      <ShortcutPill label="Abrir paleta de comandos" keys={['Ctrl', 'K']} />
      <ShortcutPill label="Guardar borrador" keys={['Ctrl', 'Shift', 'S']} />
    </div>
  ),
  6: (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3 rounded-box border border-base-300 bg-base-100 p-4">
      <RatingDisplay score={4.8} totalReviews={142} />
      <RatingDisplay score={3.5} totalReviews={1} />
      <RatingDisplay score={2.2} showScoreText={false} />
    </div>
  ),
  7: (
    <div className="grid gap-4 sm:grid-cols-2">
      <MetricBentoStat
        title="Promedio ponderado acumulado"
        value="4.62"
        maxValue="5.0"
        trendText="+0.18 respecto al semestre anterior"
        trendType="positive"
        icon={<BadgeCheckIcon />}
      />
      <MetricBentoStat
        title="Créditos aprobados"
        value={118}
        maxValue={160}
        trendText="Sin cambios"
        icon={<BookIcon />}
      />
    </div>
  ),
};
