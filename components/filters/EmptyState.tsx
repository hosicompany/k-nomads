import Button from '@/components/ui/Button';

export interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
      <div className="mb-4 text-6xl">🔍</div>
      <h3 className="mb-2 text-lg font-bold text-gray-900">
        검색 결과가 없습니다
      </h3>
      <p className="mb-6 text-sm text-gray-600">
        다른 검색어나 필터 조건을 시도해보세요
      </p>
      <Button variant="secondary" size="md" onClick={onReset}>
        필터 초기화
      </Button>
    </div>
  );
}
