'use client';

import { useState } from 'react';
import { AlertBanner } from '@/shared/components/ui/alert-banner';

export function AlertBannerDemo() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <AlertBanner
        type="info"
        title="Período de adición y cancelación"
        description="Recuerda que el sistema cerrará las inscripciones el viernes a las 18:00."
        actionLabel={showCalendar ? 'Ocultar calendario' : 'Ver calendario'}
        onActionClick={() => setShowCalendar((previous) => !previous)}
      />
      {showCalendar ? (
        <ul className="rounded-box border border-base-300 bg-base-100 p-4 text-sm">
          <li>Lunes: apertura de adiciones.</li>
          <li>Miércoles: cancelación sin nota.</li>
          <li>Viernes 18:00: cierre del sistema.</li>
        </ul>
      ) : null}
      <AlertBanner
        type="warning"
        title="Fecha límite próxima"
        description="La entrega del corte 3 cierra el viernes a las 11:59 p. m."
      />
    </div>
  );
}
