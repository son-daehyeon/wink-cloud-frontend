'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import GeneralSetting from '@/app/project/instance/[id]/edit/_component/general';
import PerformanceSetting from '@/app/project/instance/[id]/edit/_component/performance';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import Loader from '@/components/loader';

import { useApi, useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import {
  UpdateInstanceRequest,
  UpdateInstanceRequestSchema,
} from '@/lib/api/type/domain/project/instance';
import Instance from '@/lib/api/type/schema/project/instance';
import { useProjectStore } from '@/lib/store/project';

import { zodResolver } from '@hookform/resolvers/zod';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const router = useRouter();

  const [isApi, startApi] = useApiWithToast();
  const [, startApi2] = useApi();

  const { project } = useProjectStore();

  const [instance, setInstance] = useState<Instance>();

  const form = useForm<UpdateInstanceRequest>({
    resolver: zodResolver(UpdateInstanceRequestSchema),
    defaultValues: {
      name: '',
      core: 1,
      memory: 512,
      swap: 0,
      disk: 8,
    },
  });

  const onSubmit = useCallback(
    (values: UpdateInstanceRequest) => {
      if (!project || !instance) return;

      startApi(
        async () => {
          const { instance: _instance } = await Api.Domain.Project.Instance.Index.updateInstance(
            project.id,
            instance.id,
            values,
          );
          router.push(`/project/instance/${_instance.id}`);
        },
        {
          loading: '인스턴스를 수정하고 있습니다.',
          success: '인스턴스를 수정했습니다.',
        },
      );
    },
    [project, instance],
  );

  useEffect(() => {
    if (!project) return;

    startApi2(async () => {
      const { id } = await params;
      const { instances } = await Api.Domain.Project.Instance.Index.myInstances(project.id);

      const instance = instances.find((instance) => instance.id === id);

      if (!instance) router.replace('/project/instance');

      setInstance(instance);
    });
  }, [project]);

  useEffect(() => {
    if (!instance) return;

    form.reset(instance);
  }, [instance]);

  if (!project || !instance) return <Loader />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-[600px]">
        <GeneralSetting form={form} />
        <PerformanceSetting instance={instance} form={form} />
        <Button type="submit" disabled={isApi} size="lg">
          인스턴스 수정
        </Button>
      </form>
    </Form>
  );
}
