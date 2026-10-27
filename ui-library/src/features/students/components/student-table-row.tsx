import Image from 'next/image';
import { getInitials } from '@/shared/lib/get-initials';

export type StudentStatus = 'active' | 'inactive' | 'graduated';

export interface StudentTableRowProps {
  studentId: string;
  studentCode: string;
  fullName: string;
  program: string;
  avatarUrl: string;
  status: StudentStatus;
  onViewGradesClick?: (studentId: string) => void;
}

const statusConfig: Record<StudentStatus, { label: string; badge: string }> = {
  active: { label: 'Activo', badge: 'badge-success' },
  inactive: { label: 'Inactivo', badge: 'badge-ghost' },
  graduated: { label: 'Graduado', badge: 'badge-primary' },
};

export function StudentTableRow({
  studentId,
  studentCode,
  fullName,
  program,
  avatarUrl,
  status,
  onViewGradesClick,
}: StudentTableRowProps) {
  const hasImage = avatarUrl.trim() !== '';
  const { label, badge } = statusConfig[status];

  return (
    <tr className="hover:bg-base-200/60">
      <td>
        <div className="flex items-center gap-3">
          <div className={`avatar ${hasImage ? '' : 'avatar-placeholder'}`}>
            <div className="mask mask-squircle w-10 bg-primary text-primary-content sm:w-12">
              {hasImage ? (
                <Image
                  src={avatarUrl}
                  alt={`Fotografía de perfil de ${fullName}`}
                  width={48}
                  height={48}
                />
              ) : (
                <span className="text-sm font-semibold" aria-hidden="true">
                  {getInitials(fullName)}
                </span>
              )}
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-bold wrap-break-word">{fullName}</p>
            <p className="text-xs text-base-content/70">Código: {studentCode}</p>
            <p className="text-xs text-base-content/70 sm:hidden">{program}</p>
            <span className={`badge badge-xs mt-1 ${badge} sm:hidden`}>{label}</span>
          </div>
        </div>
      </td>
      <td className="hidden sm:table-cell">
        <span className="badge badge-ghost badge-sm h-auto py-1">{program}</span>
      </td>
      <td className="hidden sm:table-cell">
        <span className={`badge badge-sm ${badge}`}>{label}</span>
      </td>
      <td className="text-end">
        {onViewGradesClick ? (
          <button
            type="button"
            className="btn btn-ghost btn-xs text-primary"
            onClick={() => onViewGradesClick(studentId)}
          >
            Ver notas
            <span className="sr-only"> de {fullName}</span>
          </button>
        ) : null}
      </td>
    </tr>
  );
}
