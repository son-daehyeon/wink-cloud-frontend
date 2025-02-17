'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100dvh-80px)]">
      <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-md w-full">
        <h1 className="text-8xl sm:text-9xl font-extrabold text-primary">404</h1>
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="sm:text-lg text-muted-foreground">요청하신 페이지를 찾을 수 없습니다.</p>
        </div>
        <Button asChild className="rounded-full">
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  );
}
