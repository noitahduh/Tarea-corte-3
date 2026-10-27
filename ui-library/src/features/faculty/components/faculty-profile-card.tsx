import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { getInitials } from '@/shared/lib/get-initials';
import { FacultyProfileTabs, type FacultyTabContent } from './faculty-profile-tabs';

export type { FacultyTabContent };

export interface FacultyProfileCardProps {
  fullName: string;
  academicRole: string;
  department: string;
  avatarUrl: string;
  tabs: FacultyTabContent[];
  onContactClick?: () => void;
  contactHref?: string;
}

export function FacultyProfileCard({
  fullName,
  academicRole,
  department,
  avatarUrl,
  tabs,
  onContactClick,
  contactHref,
}: FacultyProfileCardProps) {
  const hasImage = avatarUrl.trim() !== '';
  const contactClass = 'btn btn-xs btn-outline btn-primary';

  let contactAction: ReactNode = null;
  if (onContactClick) {
    contactAction = (
      <button type="button" className={contactClass} onClick={onContactClick}>
        Contactar docente
      </button>
    );
  } else if (contactHref) {
    contactAction = (
      <Link href={contactHref} className={contactClass}>
        Contactar docente
      </Link>
    );
  }

  return (
    <article className="card w-full rounded-2xl border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-4 p-4 sm:p-6">
        <header className="flex items-center gap-4">
          <div className={`avatar ${hasImage ? '' : 'avatar-placeholder'}`}>
            <div className="w-16 rounded-xl bg-primary text-primary-content ring-2 ring-primary ring-offset-2 ring-offset-base-100 sm:w-20">
              {hasImage ? (
                <Image
                  src={avatarUrl}
                  alt={`Fotografía de perfil de ${fullName}`}
                  width={80}
                  height={80}
                />
              ) : (
                <span className="text-xl font-bold sm:text-2xl" aria-hidden="true">
                  {getInitials(fullName)}
                </span>
              )}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold wrap-break-word">{fullName}</h3>
            <p className="text-sm font-medium text-primary">{academicRole}</p>
            <p className="text-sm text-base-content/70">{department}</p>
          </div>
        </header>

        <FacultyProfileTabs tabs={tabs} ariaLabel={`Información de ${fullName}`} />

        {contactAction ? (
          <div className="card-actions justify-end">{contactAction}</div>
        ) : null}
      </div>
    </article>
  );
}
