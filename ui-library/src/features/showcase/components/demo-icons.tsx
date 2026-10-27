export interface DemoIconProps {
  className?: string;
}

function IconBase({ className = 'size-6', path }: DemoIconProps & { path: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export function DownloadIcon({ className = 'size-4' }: DemoIconProps) {
  return <IconBase className={className} path="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" />;
}

export function BookIcon({ className }: DemoIconProps) {
  return (
    <IconBase
      className={className}
      path="M12 6.5C10.5 5 8 4.5 4 4.5v14c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-14c-4 0-6.5.5-8 2zm0 0v14"
    />
  );
}

export function BoltIcon({ className }: DemoIconProps) {
  return <IconBase className={className} path="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />;
}

export function BadgeCheckIcon({ className }: DemoIconProps) {
  return (
    <IconBase
      className={className}
      path="M9 12l2 2 4-4M12 3l2.4 1.8 3 .2.9 2.9 2.2 2-1 2.9 1 2.8-2.2 2-.9 2.9-3 .2L12 21l-2.4-1.8-3-.2-.9-2.9-2.2-2 1-2.8-1-2.9 2.2-2 .9-2.9 3-.2L12 3z"
    />
  );
}
