import { useId } from 'react';

export interface TutoringTopicOption {
  id: string;
  label: string;
}

export interface TutoringRequestFormProps {
  availableTopics: TutoringTopicOption[];
  actionHandler?: (formData: FormData) => Promise<void>;
}

export function TutoringRequestForm({
  availableTopics,
  actionHandler,
}: TutoringRequestFormProps) {
  const baseId = useId();
  const topicId = `${baseId}-topic`;
  const descriptionId = `${baseId}-description`;

  return (
    <form
      action={actionHandler}
      className="card w-full border border-base-300 bg-base-100 shadow-sm"
    >
      <div className="card-body p-4 sm:p-6">
        <fieldset className="fieldset gap-2">
          <legend className="fieldset-legend text-lg">Agendar asesoría técnica</legend>
          <p className="text-sm text-base-content/70">
            Selecciona el módulo y describe brevemente el bloqueo.
          </p>

          <label htmlFor={topicId} className="fieldset-legend">
            Tema del bloqueo
          </label>
          <select
            id={topicId}
            name="topicId"
            required
            defaultValue=""
            className="select w-full"
          >
            <option value="" disabled>
              Selecciona un tema
            </option>
            {availableTopics.map((topic) => (
              <option key={topic.id} value={topic.id}>
                {topic.label}
              </option>
            ))}
          </select>

          <label htmlFor={descriptionId} className="fieldset-legend">
            Descripción breve
          </label>
          <textarea
            id={descriptionId}
            name="description"
            required
            minLength={10}
            maxLength={500}
            placeholder="Ej.: No me carga el estado en el componente hijo…"
            className="textarea h-24 w-full"
          />
          <p className="label whitespace-normal">Mínimo 10 caracteres.</p>

          <button type="submit" className="btn btn-primary mt-2 w-full">
            Enviar solicitud
          </button>
        </fieldset>
      </div>
    </form>
  );
}
