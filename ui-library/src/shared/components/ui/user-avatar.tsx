import Image from 'next/image';
import { getInitials } from '@/shared/lib/get-initials';

export type UserAvatarSize = 'sm' | 'md' | 'lg';

export interface UserAvatarProps {
  name: string;
  role: string;
  program?: string;
  avatarUrl: string;
  isOnline?: boolean;
  locationText?: string;
  size?: UserAvatarSize;
}

const sizeConfig: Record<
  UserAvatarSize,
  { box: string; px: number; text: string }
> = {
  sm: { box: 'w-12', px: 48, text: 'text-base' },
  md: { box: 'w-16', px: 64, text: 'text-xl' },
  lg: { box: 'w-24', px: 96, text: 'text-3xl' },
};

export function UserAvatar({
  name,
  role,
  program,
  avatarUrl,
  isOnline = false,
  locationText,
  size = 'md',
}: UserAvatarProps) {
  const { box, px, text } = sizeConfig[size];
  const hasImage = avatarUrl.trim() !== '';

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className={`avatar ${isOnline ? 'avatar-online' : 'avatar-offline'} ${
          hasImage ? '' : 'avatar-placeholder'
        }`}
      >
        <div
          className={`${box} rounded-full ring ring-primary ring-offset-2 ring-offset-base-100 ${
            hasImage ? '' : 'bg-neutral text-neutral-content'
          }`}
        >
          {hasImage ? (
            <Image
              src={avatarUrl}
              alt={`Fotografía de perfil de ${name}`}
              width={px}
              height={px}
            />
          ) : (
            <span className={text} aria-hidden="true">
              {getInitials(name)}
            </span>
          )}
        </div>
      </div>

      <div className="min-w-0">
        <p className="truncate font-semibold">{name}</p>
        <span className="badge badge-primary badge-sm">{role}</span>
        {program ? (
          <p className="truncate text-sm text-base-content/70">{program}</p>
        ) : null}
        {locationText ? (
          <p className="truncate text-sm text-base-content/70">
            {locationText}
          </p>
        ) : null}
        <span className="sr-only">{isOnline ? 'En línea' : 'Desconectado'}</span>
      </div>
    </div>
  );
}