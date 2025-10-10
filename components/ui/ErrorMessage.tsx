import Button from './Button';

export interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryButtonText?: string;
}

export default function ErrorMessage({
  title = '오류가 발생했습니다',
  message,
  onRetry,
  retryButtonText = '다시 시도',
}: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-red-200 bg-red-50 p-8 text-center">
      <div className="mb-4 text-5xl">⚠️</div>
      <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
      <p className="mb-6 text-sm text-gray-600">{message}</p>
      {onRetry && (
        <Button variant="primary" size="md" onClick={onRetry}>
          {retryButtonText}
        </Button>
      )}
    </div>
  );
}
