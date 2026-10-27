'use client';

import { useState } from 'react';
import {
  StudentTableRow,
  type StudentTableRowProps,
} from '@/features/students/components/student-table-row';

type StudentData = Omit<StudentTableRowProps, 'onViewGradesClick'> & {
  gradesSummary: string;
};

const students: StudentData[] = [
  {
    studentId: 'st-01',
    studentCode: 'A00389120',
    fullName: 'Julián Ospina Mora',
    program: 'Ing. de Sistemas',
    avatarUrl: '',
    status: 'active',
    gradesSummary: 'Promedio 4.3 · 5 asignaturas en curso.',
  },
  {
    studentId: 'st-02',
    studentCode: 'A00371455',
    fullName: 'Camila Rengifo',
    program: 'Diseño de Medios',
    avatarUrl: '',
    status: 'inactive',
    gradesSummary: 'Promedio 3.9 · Sin matrícula este semestre.',
  },
  {
    studentId: 'st-03',
    studentCode: 'A00290318',
    fullName: 'Daniel Arboleda',
    program: 'Ing. Telemática',
    avatarUrl: '',
    status: 'graduated',
    gradesSummary: 'Promedio final 4.5 · Grado en 2025.',
  },
];

export function StudentTableDemo() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = students.find((student) => student.studentId === selectedId);

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
        <table className="table table-sm sm:table-md">
          <caption className="sr-only">Directorio de estudiantes</caption>
          <thead>
            <tr>
              <th scope="col">Estudiante</th>
              <th scope="col" className="hidden sm:table-cell">
                Programa
              </th>
              <th scope="col" className="hidden sm:table-cell">
                Estado
              </th>
              <th scope="col">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <StudentTableRow
                key={student.studentId}
                studentId={student.studentId}
                studentCode={student.studentCode}
                fullName={student.fullName}
                program={student.program}
                avatarUrl={student.avatarUrl}
                status={student.status}
                onViewGradesClick={setSelectedId}
              />
            ))}
          </tbody>
        </table>
      </div>
      <p role="status" className="rounded-box bg-base-100 p-3 text-sm">
        {selected
          ? `Notas de ${selected.fullName}: ${selected.gradesSummary}`
          : 'Pulsa «Ver notas» en una fila para consultar el resumen.'}
      </p>
    </div>
  );
}
