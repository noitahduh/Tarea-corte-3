import type { ReactNode } from 'react';
import { ComponentShowcase } from '@/features/showcase/components/component-showcase';
import { ShowcaseIndex } from '@/features/showcase/components/showcase-index';
import { showcaseCatalog, showcaseLevels } from '@/features/showcase/data/showcase-catalog';
import { levelOneDemos } from '@/features/showcase/demos/level-one-demos';
import { levelThreeDemos } from '@/features/showcase/demos/level-three-demos';
import { levelTwoDemos } from '@/features/showcase/demos/level-two-demos';
import {
  AcademicAppNavbar,
  type NavLinkItem,
  type UserSessionData,
} from '@/shared/components/ui/academic-app-navbar';

const navLinks: NavLinkItem[] = showcaseLevels.map((level) => ({
  label: level.title.split(':')[0],
  href: `#${level.id}`,
}));

const sessionUser: UserSessionData = {
  name: 'Estudiante de ejemplo',
  avatarUrl: '',
  notificationsCount: 3,
  currentTerm: '2026-2',
};

const demos: Record<number, ReactNode> = {
  ...levelOneDemos,
  ...levelTwoDemos,
  ...levelThreeDemos,
};

export default function Home() {
  return (
    <>
      <AcademicAppNavbar
        brandName="Biblioteca Icesi UI"
        user={sessionUser}
        links={navLinks}
      />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-14 p-4 sm:p-6">
        <header className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold sm:text-3xl">
              Biblioteca de componentes académicos
            </h1>
            <p className="text-base-content/80">
              Los {showcaseCatalog.length} componentes de la actividad, agrupados por
              nivel. Cada uno muestra su número, su nombre y una demostración.
            </p>
          </div>
          <ShowcaseIndex />
        </header>

        {showcaseLevels.map((level) => (
          <section
            key={level.id}
            id={level.id}
            aria-labelledby={`${level.id}-titulo`}
            className="flex scroll-mt-4 flex-col gap-10"
          >
            <div className="flex flex-col gap-1 border-b border-base-300 pb-3">
              <h2 id={`${level.id}-titulo`} className="text-2xl font-bold sm:text-3xl">
                {level.title}
              </h2>
              <p className="text-base-content/80">{level.description}</p>
            </div>

            {showcaseCatalog
              .filter((entry) => entry.level === level.id)
              .map((entry) => (
                <ComponentShowcase key={entry.number} entry={entry}>
                  {demos[entry.number]}
                </ComponentShowcase>
              ))}
          </section>
        ))}
      </main>
    </>
  );
}
