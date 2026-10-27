'use client';

import { useState } from 'react';
import { ActionButton } from '@/shared/components/ui/action-button';
import {
  ToastNotification,
  type ToastVariant,
} from '@/shared/components/ui/toast-notification';

const toastDemos: Record<ToastVariant, { button: string; title: string; message: string }> = {
  success: {
    button: 'Éxito',
    title: 'Entrega de taller confirmada',
    message: 'Tu entrega quedó registrada en la plataforma del curso.',
  },
  info: {
    button: 'Información',
    title: 'Recordatorio',
    message: 'Tienes una sesión de asesoría mañana a las 10:00.',
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

const variants = Object.keys(toastDemos) as ToastVariant[];

export function ToastDemo() {
  const [activeVariant, setActiveVariant] = useState<ToastVariant | null>(null);

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-center text-sm text-base-content/70">
        Elige una variante: el toast aparece arriba a la derecha.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {variants.map((variant) => (
          <ActionButton
            key={variant}
            label={toastDemos[variant].button}
            variant="outline"
            size="sm"
            onClick={() => setActiveVariant(variant)}
          />
        ))}
      </div>
      {activeVariant ? (
        <ToastNotification
          title={toastDemos[activeVariant].title}
          message={toastDemos[activeVariant].message}
          variant={activeVariant}
          onClose={() => setActiveVariant(null)}
        />
      ) : null}
    </div>
  );
}
