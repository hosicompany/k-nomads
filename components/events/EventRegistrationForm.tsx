'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event } from '@/types';
import Button from '@/components/ui/Button';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/lib/supabase/client';

export interface EventRegistrationFormProps {
  event: Event;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export default function EventRegistrationForm({
  event,
  onClose,
}: EventRegistrationFormProps) {
  const { user } = useUser();
  const supabase = createClient();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '전화번호를 입력해주세요';
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = '올바른 전화번호 형식이 아닙니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if user is logged in
    if (!user) {
      setSubmitError('이벤트 참가 신청은 로그인이 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Insert event registration to Supabase
      const { error } = await supabase.from('event_registrations').insert({
        event_id: event.id,
        user_id: user.id,
      });

      if (error) {
        console.error('Error registering for event:', error);

        // Check if already registered
        if (error.code === '23505') {
          setSubmitError('이미 이 이벤트에 신청하셨습니다.');
        } else {
          setSubmitError('이벤트 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);

      // 2초 후 모달 닫기 및 페이지 새로고침
      setTimeout(() => {
        onClose();
        window.location.reload(); // Reload to update registered count
      }, 2000);
    } catch (error) {
      console.error('Unexpected error:', error);
      setSubmitError('예상치 못한 오류가 발생했습니다.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 입력 시 해당 필드 에러 제거
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
        >
          {isSuccess ? (
            <div className="p-8 text-center">
              <div className="mb-4 text-6xl">✅</div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                신청 완료!
              </h3>
              <p className="text-gray-600">
                이벤트 참가 신청이 완료되었습니다.
                <br />
                등록하신 이메일로 안내를 보내드릴게요.
              </p>
            </div>
          ) : (
            <>
              <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    참가 신청
                  </h2>
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-200"
                    aria-label="닫기"
                  >
                    <svg
                      className="h-5 w-5 text-gray-700"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-600">{event.title}</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                {/* Error message */}
                {submitError && (
                  <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    {submitError}
                  </div>
                )}

                {/* Login prompt for non-authenticated users */}
                {!user && (
                  <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm text-yellow-700">
                    이벤트 참가 신청은 <a href="/login" className="font-semibold underline">로그인</a>이 필요합니다.
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      이름 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full rounded-lg border px-4 py-2.5 text-sm ${
                        errors.name
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                      } focus:outline-none focus:ring-2`}
                      placeholder="홍길동"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`block w-full rounded-lg border px-4 py-2.5 text-sm ${
                        errors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                      } focus:outline-none focus:ring-2`}
                      placeholder="example@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      전화번호 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`block w-full rounded-lg border px-4 py-2.5 text-sm ${
                        errors.phone
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                      } focus:outline-none focus:ring-2`}
                      placeholder="010-1234-5678"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      메시지 (선택)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="주최자에게 전달할 메시지가 있다면 작성해주세요"
                    />
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    fullWidth
                    onClick={onClose}
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '신청 중...' : '신청하기'}
                  </Button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
