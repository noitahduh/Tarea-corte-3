'use server';

export async function submitTutoringRequest(formData: FormData): Promise<void> {
  const topicId = formData.get('topicId');
  const description = formData.get('description');

  if (typeof topicId !== 'string' || typeof description !== 'string') return;
  if (topicId === '' || description.trim().length < 10) return;

  console.info(`Solicitud de tutoría recibida para el tema ${topicId}`);
}
