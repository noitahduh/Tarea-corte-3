'use client';

import { useState } from 'react';
import {
  CourseCard,
  type CourseCardProps,
} from '@/features/courses/components/course-card';

type CourseData = Pick<
  CourseCardProps,
  | 'courseCode'
  | 'title'
  | 'instructor'
  | 'room'
  | 'credits'
  | 'progressPercentage'
  | 'courseUrl'
  | 'syllabusUrl'
>;

const courses: CourseData[] = [
  {
    courseCode: 'DEDW-2301',
    title: 'Desarrollo de entornos digitales web',
    instructor: 'Prof. Laura Quintero',
    room: 'Aula 301 · Edificio L',
    credits: 3,
    progressPercentage: 65,
    courseUrl: '#detalle-asignatura',
    syllabusUrl: '#detalle-asignatura',
  },
  {
    courseCode: 'EST-2010',
    title: 'Estadística aplicada',
    instructor: 'Prof. Hernán Valencia',
    room: 'Aula 214 · Edificio D',
    credits: 3,
    progressPercentage: 85,
    courseUrl: '#detalle-asignatura',
  },
  {
    courseCode: 'BD-1102',
    title: 'Bases de datos',
    instructor: 'Prof. Natalia Ríos',
    room: 'Laboratorio 105',
    credits: 4,
    progressPercentage: 40,
    courseUrl: '#detalle-asignatura',
    syllabusUrl: '#detalle-asignatura',
  },
];

export function CourseCardsDemo() {
  const [detailCode, setDetailCode] = useState(courses[0].courseCode);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const detailCourse =
    courses.find((course) => course.courseCode === detailCode) ?? courses[0];

  function toggleSelected(code: string) {
    setSelectedCodes((previous) =>
      previous.includes(code)
        ? previous.filter((item) => item !== code)
        : [...previous, code],
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.courseCode}
            {...course}
            isSelected={selectedCodes.includes(course.courseCode)}
            onViewDetails={() => setDetailCode(course.courseCode)}
            onToggleSelect={() => toggleSelected(course.courseCode)}
            onLinkClick={() => setDetailCode(course.courseCode)}
          />
        ))}
      </div>
      <div
        id="detalle-asignatura"
        className="scroll-mt-4 rounded-box border border-base-300 bg-base-100 p-4 text-sm"
      >
        <h4 className="text-base font-semibold">
          {detailCourse.courseCode} · {detailCourse.title}
        </h4>
        <p>
          {detailCourse.room} · {detailCourse.instructor} · {detailCourse.credits}{' '}
          créditos
        </p>
        <p>
          {detailCourse.syllabusUrl
            ? 'Programa disponible (contenido de ejemplo).'
            : 'Esta asignatura aún no tiene programa publicado.'}
        </p>
        <p className="mt-2 text-base-content/70">
          Seleccionadas: {selectedCodes.length > 0 ? selectedCodes.join(', ') : 'ninguna'}
        </p>
      </div>
    </div>
  );
}
