'use client';

import { useState } from 'react';
import { Event } from '@/types';
import Button from '@/components/ui/Button';
import EventRegistrationForm from './EventRegistrationForm';

export interface EventDetailClientProps {
  event: Event;
  isFull: boolean;
}

export default function EventDetailClient({ event, isFull }: EventDetailClientProps) {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  return (
    <>
      <div className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-sm">
        <div className="p-6">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setShowRegistrationForm(true)}
            disabled={isFull}
          >
            {isFull ? '마감되었습니다' : '참가 신청하기'}
          </Button>
          {!isFull && (
            <p className="mt-3 text-center text-sm text-gray-600">
              참가비는 무료입니다
            </p>
          )}
        </div>
      </div>

      {showRegistrationForm && (
        <EventRegistrationForm
          event={event}
          onClose={() => setShowRegistrationForm(false)}
        />
      )}
    </>
  );
}
