import Image from 'next/image';
import Link from 'next/link';
import { getInitials } from '@/shared/lib/get-initials';
import { NavbarUserMenu, type NavLinkItem } from './navbar-user-menu';

export type { NavLinkItem };

export interface UserSessionData {
  name: string;
  avatarUrl: string;
  notificationsCount: number;
  currentTerm: string;
}

export interface AcademicAppNavbarProps {
  brandName: string;
  user: UserSessionData;
  links?: NavLinkItem[];
  onNotificationsClick?: () => void;
}

function normalizeCount(value: number): number {
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="size-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 11-6 0"
      />
    </svg>
  );
}

export function AcademicAppNavbar({
  brandName,
  user,
  links = [],
  onNotificationsClick,
}: AcademicAppNavbarProps) {
  const count = normalizeCount(user.notificationsCount);
  const countText = count > 99 ? '99+' : String(count);
  const notificationsLabel =
    count === 1 ? '1 notificación sin leer' : `${count} notificaciones sin leer`;
  const hasImage = user.avatarUrl.trim() !== '';

  const bell = (
    <span className="indicator">
      <BellIcon />
      {count > 0 ? (
        <span className="indicator-item badge badge-xs badge-secondary">
          {countText}
        </span>
      ) : null}
    </span>
  );

  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="navbar mx-auto max-w-5xl gap-2 px-2 sm:px-4">
        <div className="navbar-start min-w-0 flex-1">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 rounded-field p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span
              className="grid size-10 shrink-0 place-items-center rounded-field bg-primary text-lg font-bold text-primary-content"
              aria-hidden="true"
            >
              {getInitials(brandName).charAt(0)}
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-bold text-primary">{brandName}</span>
              <span className="truncate text-xs text-base-content/70">
                Periodo {user.currentTerm}
              </span>
            </span>
          </Link>
        </div>

        {links.length > 0 ? (
          <nav aria-label="Secciones" className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 px-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <div className="navbar-end w-auto shrink-0 gap-1">
          {onNotificationsClick ? (
            <button
              type="button"
              className="btn btn-circle btn-ghost"
              aria-label={notificationsLabel}
              onClick={onNotificationsClick}
            >
              {bell}
            </button>
          ) : (
            <span
              role="img"
              aria-label={notificationsLabel}
              className="grid size-10 place-items-center"
            >
              {bell}
            </span>
          )}

          <NavbarUserMenu
            label={`Menú de ${user.name}`}
            userName={user.name}
            currentTerm={user.currentTerm}
            links={links}
          >
            <span className="avatar avatar-online">
              <span className="flex aspect-square w-9 items-center justify-center overflow-hidden rounded-full bg-neutral text-neutral-content">
                {hasImage ? (
                  <Image src={user.avatarUrl} alt="" width={36} height={36} />
                ) : (
                  <span className="text-sm">{getInitials(user.name)}</span>
                )}
              </span>
            </span>
            <span className="hidden max-w-40 truncate text-sm font-medium md:inline">
              {user.name}
            </span>
          </NavbarUserMenu>
        </div>
      </div>
    </header>
  );
}
