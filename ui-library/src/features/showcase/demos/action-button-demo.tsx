'use client';

import { useEffect, useRef, useState } from 'react';
import { DownloadIcon } from '@/features/showcase/components/demo-icons';
import { ActionButton } from '@/shared/components/ui/action-button';

export function ActionButtonDemo() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleGenerate() {
    if (isGenerating) return;
    setIsGenerating(true);
    setIsReady(false);
    timeoutRef.current = setTimeout(() => {
      setIsGenerating(false);
      setIsReady(true);
    }, 1500);
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-3">
        <ActionButton
          label={isGenerating ? 'Generando guía…' : 'Generar guía lab'}
          icon={<DownloadIcon />}
          badgeText="PDF"
          isLoading={isGenerating}
          onClick={handleGenerate}
        />
        <ActionButton label="Procesando" variant="outline" isLoading />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <ActionButton label="Secundario" variant="secondary" size="sm" badgeText="3" />
        <ActionButton label="Ghost" variant="ghost" size="sm" />
        <ActionButton label="Grande" variant="outline" size="lg" />
      </div>
      <p role="status" className="min-h-5 text-sm text-base-content/70">
        {isReady ? 'La guía quedó lista (simulación local).' : ''}
      </p>
    </div>
  );
}
