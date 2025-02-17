'use client';

import Loader from '@/components/loader';

import { useProjectStore } from '@/lib/store/project';

export default function Page() {
  const { project } = useProjectStore();

  if (!project) return <Loader />;

  return (
    <p>
      {Array.from({ length: 500 }).map((_, i) => (
        <p key={i}>project</p>
      ))}
    </p>
  );
}
