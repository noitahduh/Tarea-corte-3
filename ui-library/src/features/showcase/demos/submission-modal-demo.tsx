'use client';

import { useState } from 'react';
import { ActionButton } from '@/shared/components/ui/action-button';
import { AlertBanner } from '@/shared/components/ui/alert-banner';
import { SubmissionConfirmModal } from '@/shared/components/ui/submission-confirm-modal';

type SubmissionResult = 'confirmed' | 'cancelled';

export function SubmissionModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  function close(nextResult: SubmissionResult) {
    setIsOpen(false);
    setResult(nextResult);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <ActionButton label="Entregar trabajo" onClick={() => setIsOpen(true)} />

      {result ? (
        <div className="w-full">
          <AlertBanner
            type={result === 'confirmed' ? 'success' : 'info'}
            title={result === 'confirmed' ? 'Entrega registrada' : 'Entrega cancelada'}
            description={
              result === 'confirmed'
                ? 'Tu trabajo quedó entregado (simulación local).'
                : 'No se entregó nada. Puedes intentarlo cuando quieras.'
            }
          />
        </div>
      ) : null}

      <SubmissionConfirmModal
        isOpen={isOpen}
        assignmentName="Corte 3: Biblioteca de componentes"
        warningMessage="Verifica que el repositorio y el README estén completos antes de entregar."
        onConfirm={() => close('confirmed')}
        onCancel={() => close('cancelled')}
      />
    </div>
  );
}
