import Image from 'next/image';
import { getInitials } from '@/shared/lib/get-initials';

export type DeliveryStatus = 'sent' | 'delivered' | 'read';

export interface ChatMessageProps {
  senderName: string;
  senderRole?: string;
  message: string;
  timestamp: string;
  avatarUrl: string;
  isSenderTeacher?: boolean;
  deliveryStatus?: DeliveryStatus;
}

const deliveryLabels: Record<DeliveryStatus, { text: string; marks: string }> = {
  sent: { text: 'Enviado', marks: '✓' },
  delivered: { text: 'Entregado', marks: '✓✓' },
  read: { text: 'Leído', marks: '✓✓' },
};

export function AdvisorChatBubble({
  senderName,
  senderRole,
  message,
  timestamp,
  avatarUrl,
  isSenderTeacher = false,
  deliveryStatus,
}: ChatMessageProps) {
  const hasImage = avatarUrl.trim() !== '';

  return (
    <div className={`chat ${isSenderTeacher ? 'chat-end' : 'chat-start'}`}>
      <div className={`chat-image avatar ${hasImage ? '' : 'avatar-placeholder'}`}>
        <div
          className={`w-10 rounded-full ring-2 ring-offset-2 ring-offset-base-100 ${
            isSenderTeacher
              ? 'bg-primary text-primary-content ring-primary'
              : 'bg-secondary text-secondary-content ring-secondary'
          }`}
        >
          {hasImage ? (
            <Image src={avatarUrl} alt="" width={40} height={40} />
          ) : (
            <span className="text-sm font-semibold" aria-hidden="true">
              {getInitials(senderName)}
            </span>
          )}
        </div>
      </div>

      <div className="chat-header flex-wrap gap-x-1 text-sm font-semibold">
        {senderName}
        {senderRole ? (
          <span className="font-normal text-base-content/70">({senderRole})</span>
        ) : null}
        <span className="text-xs font-normal text-base-content/70">{timestamp}</span>
      </div>

      <div
        className={`chat-bubble wrap-break-word ${
          isSenderTeacher
            ? 'chat-bubble-primary'
            : 'border border-base-300 bg-base-100 text-base-content'
        }`}
      >
        {message}
      </div>

      {deliveryStatus ? (
        <div className="chat-footer text-xs text-base-content/70">
          {deliveryLabels[deliveryStatus].text}
          <span aria-hidden="true">{deliveryLabels[deliveryStatus].marks}</span>
        </div>
      ) : null}
    </div>
  );
}
