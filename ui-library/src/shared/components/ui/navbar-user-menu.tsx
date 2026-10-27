'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import type { FocusEvent, ReactNode } from 'react';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface NavbarUserMenuProps {
  label: string;
  userName: string;
  currentTerm: string;
  links: NavLinkItem[];
  children: ReactNode;
}

export function NavbarUserMenu({
  label,
  userName,
  currentTerm,
  links,
  children,
}: NavbarUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !containerRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  }

  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      className={`dropdown dropdown-end ${isOpen ? 'dropdown-open' : 'dropdown-close'}`}
    >
      <button
        ref={triggerRef}
        type="button"
        className="btn btn-ghost h-auto min-h-0 gap-2 rounded-full p-1 md:rounded-field md:pr-3"
        aria-label={label}
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        {children}
      </button>

      <div
        id={menuId}
        className="dropdown-content mt-2 w-60 max-w-[calc(100vw-2rem)] rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
      >
        <div className="border-b border-base-300 px-3 pt-1 pb-3">
          <p className="truncate font-semibold">{userName}</p>
          <p className="text-sm text-base-content/70">Periodo {currentTerm}</p>
        </div>

        {links.length > 0 ? (
          <nav aria-label="Secciones" className="lg:hidden">
            <ul className="menu w-full p-0 pt-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} onClick={() => setIsOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
