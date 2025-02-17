'use client';

import { Button } from '@/components/ui/button';

import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-80px)]">
      <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-md w-full">
        <AlertTriangle className="w-12 h-12 sm:w-16 sm:h-16" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">오류가 발생했습니다</h2>
        <p className="sm:text-lg text-muted-foreground">{error.message}</p>
        <Button onClick={reset} className="rounded-full">
          다시 시도하기
        </Button>
      </div>
    </div>
  );
}
