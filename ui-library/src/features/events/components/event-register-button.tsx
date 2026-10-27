'use client';

import { useState } from 'react';

export interface EventRegisterButtonProps {
  isSoldOut: boolean;
  onRegisterClick?: () => void;
}

export function EventRegisterButton({
  isSoldOut,
  onRegisterClick,
}: EventRegisterButtonProps) {
  const [isRegistered, setIsRegistered] = useState(false);

  function handleClick() {
    if (!isRegistered) onRegisterClick?.();
    setIsRegistered((previous) => !previous);
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className={`btn w-full ${isRegistered ? 'btn-outline btn-primary' : 'btn-primary'}`}
        disabled={isSoldOut}
        onClick={handleClick}
      >
        {isSoldOut
          ? 'Cupos agotados'
          : isRegistered
            ? 'Cancelar inscripción'
            : 'Inscribir mi equipo'}
      </button>
      <p role="status" className="text-center text-sm text-base-content/70">
        {isRegistered ? 'Tu equipo quedó preinscrito en esta convocatoria.' : ''}
      </p>
    </div>
  );
}
