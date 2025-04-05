'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import Loader from '@/components/loader';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import { useTokenStore } from '@/lib/store/token';

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { login } = useTokenStore();

  const [, startApi] = useApiWithToast();

  useEffect(() => {
    if (!searchParams.has('token')) {
      router.replace('/');
      return;
    }

    startApi(
      async () => {
        const response = await Api.Domain.Auth.login({ token: searchParams.get('token')! });
        await login(response);
        router.replace('/');
      },
      {
        loading: '로그인하고 있습니다.',
        success: '로그인 성공',
      },
    );
  }, [searchParams.get('token')]);

  return <Loader />;
}
