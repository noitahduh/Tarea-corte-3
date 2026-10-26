'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

export interface UserSessionData {
  name: string;
  avatarUrl: string;
  notificationsCount: number;
  currentTerm: string;
}

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface AcademicAppNavbarProps {
  brandName: string;
  user: UserSessionData;
  links?: NavLinkItem[];
  onNotificationsClick?: () => void;
}

function getInitials(name: string): string {
  const letters = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
  return letters || '?';
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
      className="h-6 w-6"
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const count = normalizeCount(user.notificationsCount);
  const countText = count > 99 ? '99+' : String(count);
  const notificationsLabel =
    count === 1 ? '1 notificación sin leer' : `${count} notificaciones sin leer`;
  const hasImage = user.avatarUrl.trim() !== '';

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
      toggleRef.current?.focus();
    }
  }

  const notificationsContent = (
    <span className="indicator">
      <BellIcon />
      {count > 0 ? (
        <span className="indicator-item badge badge-secondary badge-xs">
          {countText}
        </span>
      ) : null}
    </span>
  );

  return (
    <header className="relative" onKeyDown={handleKeyDown}>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start min-w-0 gap-1">
          {links.length > 0 ? (
            <button
              ref={toggleRef}
              type="button"
              className="btn btn-square btn-ghost lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setIsMenuOpen((previous) => !previous)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-6 w-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          ) : null}

          <Link
            href="/"
            className="btn btn-ghost min-w-0 px-2 text-lg font-bold text-primary"
          >
            <span className="truncate">{brandName}</span>
          </Link>

          {links.length > 0 ? (
            <nav aria-label="Principal" className="hidden lg:block">
              <ul className="menu menu-horizontal px-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <div className="navbar-end gap-2">
          <span className="badge badge-accent hidden md:inline-flex">
            {user.currentTerm}
          </span>

          {onNotificationsClick ? (
            <button
              type="button"
              className="btn btn-circle btn-ghost"
              aria-label={notificationsLabel}
              onClick={onNotificationsClick}
            >
              {notificationsContent}
            </button>
          ) : (
            <span
              role="img"
              aria-label={notificationsLabel}
              className="flex h-10 w-10 items-center justify-center"
            >
              {notificationsContent}
            </span>
          )}

          <div className="flex items-center gap-2">
            <div
              className={`avatar avatar-online ${hasImage ? '' : 'avatar-placeholder'}`}
            >
              <div className="w-9 rounded-full bg-neutral text-neutral-content">
                {hasImage ? (
                  <Image src={user.avatarUrl} alt="" width={36} height={36} />
                ) : (
                  <span className="text-sm" aria-hidden="true">
                    {getInitials(user.name)}
                  </span>
                )}
              </div>
            </div>
            <span className="sr-only text-sm font-medium md:not-sr-only md:max-w-32 md:truncate">
              {user.name}
            </span>
          </div>
        </div>
      </div>

      {links.length > 0 && isMenuOpen ? (
        <nav
          id={menuId}
          aria-label="Principal"
          className="absolute inset-x-0 top-full z-40 border-b border-base-300 bg-base-100 shadow-lg lg:hidden"
        >
          <ul className="menu w-full p-2">
            <li className="menu-title">Periodo {user.currentTerm}</li>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}