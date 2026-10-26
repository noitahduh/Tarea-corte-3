'use client';

import { useEffect, useId, useRef } from 'react';

export interface SubmissionConfirmModalProps {
  isOpen: boolean;
  assignmentName: string;
  warningMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SubmissionConfirmModal({
  isOpen,
  assignmentName,
  warningMessage,
  onConfirm,
  onCancel,
}: SubmissionConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const warningId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function handleClose() {
    if (isOpen) onCancel();
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      aria-labelledby={titleId}
      aria-describedby={warningMessage ? warningId : undefined}
      onClose={handleClose}
    >
      <div className="modal-box">
        <h3 id={titleId} className="text-lg font-bold">
          Confirmar entrega
        </h3>
        <p className="py-3 wrap-break-word">
          ¿Deseas entregar <strong>{assignmentName}</strong>? Después de
          confirmar no podrás modificar el trabajo.
        </p>

        {warningMessage ? (
          <div id={warningId} className="alert alert-warning alert-soft text-sm">
            <span className="wrap-break-word">{warningMessage}</span>
          </div>
        ) : null}

        <div className="modal-action">
          <button type="button" className="btn" onClick={onCancel}>
            Cancelar
          </button>
          <button type="button" className="btn btn-primary" onClick={onConfirm}>
            Confirmar entrega
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="submit" aria-label="Cerrar diálogo">
          cerrar
        </button>
      </form>
    </dialog>
  );
}   