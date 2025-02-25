'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import Matrix from '@/app/instance/[id]/_component/matrix';
import Status from '@/app/instance/[id]/_component/status';

import { Button } from '@/components/ui/button';

import Loader from '@/components/loader';

import { useApi } from '@/hooks/use-api';

import Api from '@/lib/api';
import Instance from '@/lib/api/type/schema/project/instance';
import { useModalStore } from '@/lib/store/modal';
import { useProjectStore } from '@/lib/store/project';

import { InstanceDeleteProps } from '@/modals/project/instance/delete';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const router = useRouter();

  const [, startApi] = useApi();

  const { open } = useModalStore();
  const { project } = useProjectStore();

  const [instance, setInstance] = useState<Instance>();

  useEffect(() => {
    if (!project) return;

    startApi(async () => {
      const { id } = await params;
      const { instances } = await Api.Domain.Project.Instance.Index.myInstances(project.id);

      const instance = instances.find((instance) => instance.id === id);

      if (!instance) router.replace('/instance');

      setInstance(instance);
    });
  }, [project]);

  if (!instance) return <Loader />;

  return (
    <div className="flex flex-col gap-6">
      <section className="flex justify-between items-end">
        <h1 className="text-3xl md:text-4xl font-bold">{instance.name}</h1>
        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(`/instance/${instance.id}/edit`)}
          >
            수정
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={() => open<InstanceDeleteProps>('project:instance:delete', { instance })}
          >
            삭제
          </Button>
        </div>
      </section>
      <Status instance={instance} />
      <Matrix instance={instance} />
    </div>
  );
}
