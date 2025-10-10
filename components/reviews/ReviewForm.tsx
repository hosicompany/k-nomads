'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { City, Review } from '@/types';
import Button from '@/components/ui/Button';
import StarRating from './StarRating';
import { useReviewStore } from '@/store/useReviewStore';

export interface ReviewFormProps {
  city: City;
  onClose: () => void;
}

interface FormData {
  rating: number;
  title: string;
  stayDuration: string;
  content: string;
  images: File[];
}

interface FormErrors {
  rating?: string;
  title?: string;
  stayDuration?: string;
  content?: string;
}

export default function ReviewForm({ city, onClose }: ReviewFormProps) {
  const [formData, setFormData] = useState<FormData>({
    rating: 0,
    title: '',
    stayDuration: '',
    content: '',
    images: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const { addReview } = useReviewStore();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (formData.rating === 0) {
      newErrors.rating = '별점을 선택해주세요';
    }

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요';
    } else if (formData.title.length > 100) {
      newErrors.title = '제목은 100자 이내로 입력해주세요';
    }

    if (!formData.stayDuration.trim()) {
      newErrors.stayDuration = '체류 기간을 입력해주세요';
    }

    if (!formData.content.trim()) {
      newErrors.content = '리뷰 내용을 입력해주세요';
    } else if (formData.content.length < 10) {
      newErrors.content = '리뷰는 10자 이상 입력해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // 가짜 API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 새 리뷰 생성
    const newReview: Review = {
      id: `review-${Date.now()}`,
      cityId: city.id,
      userId: 'current-user',
      userName: '익명의 노마드',
      userAvatar: '/avatars/default.jpg',
      rating: formData.rating,
      title: formData.title,
      stayDuration: formData.stayDuration,
      content: formData.content,
      images: imagePreviews,
      createdAt: new Date(),
      helpful: 0,
      helpfulBy: [],
    };

    addReview(newReview);

    console.log('New Review:', newReview);

    setIsSubmitting(false);
    setIsSuccess(true);

    // 2초 후 모달 닫기
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length + imagePreviews.length > 3) {
      alert('이미지는 최대 3개까지 업로드할 수 있습니다');
      return;
    }

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));

    // 이미지 프리뷰 생성
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
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
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
        >
          {isSuccess ? (
            <div className="p-8 text-center">
              <div className="mb-4 text-6xl">✅</div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                리뷰 작성 완료!
              </h3>
              <p className="text-gray-600">
                소중한 리뷰 감사합니다.
                <br />
                다른 노마드들에게 큰 도움이 될 거예요!
              </p>
            </div>
          ) : (
            <>
              <div className="sticky top-0 z-10 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      리뷰 작성
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      {city.name}에 대한 솔직한 리뷰를 남겨주세요
                    </p>
                  </div>
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
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-6">
                  {/* 별점 */}
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      별점 <span className="text-red-500">*</span>
                    </label>
                    <StarRating
                      rating={formData.rating}
                      onChange={(rating) => {
                        setFormData((prev) => ({ ...prev, rating }));
                        setErrors((prev) => ({ ...prev, rating: undefined }));
                      }}
                      size="lg"
                    />
                    {errors.rating && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.rating}
                      </p>
                    )}
                  </div>

                  {/* 제목 */}
                  <div>
                    <label
                      htmlFor="title"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      제목 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`block w-full rounded-lg border px-4 py-2.5 text-sm ${
                        errors.title
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                      } focus:outline-none focus:ring-2`}
                      placeholder="리뷰 제목을 입력하세요"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* 체류 기간 */}
                  <div>
                    <label
                      htmlFor="stayDuration"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      체류 기간 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="stayDuration"
                      name="stayDuration"
                      value={formData.stayDuration}
                      onChange={handleChange}
                      className={`block w-full rounded-lg border px-4 py-2.5 text-sm ${
                        errors.stayDuration
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                      } focus:outline-none focus:ring-2`}
                      placeholder="예: 1개월, 3개월"
                    />
                    {errors.stayDuration && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.stayDuration}
                      </p>
                    )}
                  </div>

                  {/* 리뷰 내용 */}
                  <div>
                    <label
                      htmlFor="content"
                      className="mb-1 block text-sm font-semibold text-gray-700"
                    >
                      리뷰 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      rows={6}
                      className={`block w-full rounded-lg border px-4 py-2.5 text-sm ${
                        errors.content
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/20'
                      } focus:outline-none focus:ring-2`}
                      placeholder="이 도시에서의 경험을 자세히 공유해주세요"
                    />
                    {errors.content && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.content}
                      </p>
                    )}
                  </div>

                  {/* 이미지 업로드 */}
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">
                      사진 (선택, 최대 3장)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={imagePreviews.length >= 3}
                    />
                    <label
                      htmlFor="image-upload"
                      className={`block cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-center transition-colors hover:border-blue-400 ${
                        imagePreviews.length >= 3
                          ? 'cursor-not-allowed opacity-50'
                          : ''
                      }`}
                    >
                      <span className="text-4xl">📷</span>
                      <p className="mt-2 text-sm text-gray-600">
                        사진을 추가하려면 클릭하세요
                      </p>
                    </label>

                    {imagePreviews.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="h-24 w-full rounded-lg object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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
                    {isSubmitting ? '작성 중...' : '리뷰 작성'}
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
