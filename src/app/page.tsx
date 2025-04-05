'use client';

import { useEffect } from 'react';

import { redirect } from 'next/navigation';

import Loader from '@/components/loader';

import { useUserStore } from '@/lib/store/user';

export default function Page() {
  const { user } = useUserStore();

  useEffect(() => {
    if (!user) return;
    redirect('/dns');
  }, [user]);

  return <Loader />;
}
