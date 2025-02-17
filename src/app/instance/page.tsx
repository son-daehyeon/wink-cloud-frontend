'use client';

import { useProjectStore } from '@/lib/store/project';

export default function Page() {
  const { project } = useProjectStore();

  if (!project) return;

  return <div>{project.name}</div>;
}
// checkbox
// collapsible
// select
