'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';

import GeneralSetting from '@/app/project/instance/new/_component/general';
import ImageSetting from '@/app/project/instance/new/_component/image';
import PerformanceSetting from '@/app/project/instance/new/_component/performance';
import SshKeySetting from '@/app/project/instance/new/_component/ssh-key';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import Loader from '@/components/loader';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import {
  CreateInstanceRequest,
  CreateInstanceRequestSchema,
  OsType,
} from '@/lib/api/type/domain/project/instance';
import { useProjectStore } from '@/lib/store/project';

import { zodResolver } from '@hookform/resolvers/zod';

export default function Page() {
  const router = useRouter();

  const [isApi, startApi] = useApiWithToast();

  const { project } = useProjectStore();

  const form = useForm<CreateInstanceRequest>({
    resolver: zodResolver(CreateInstanceRequestSchema),
    defaultValues: {
      name: '',
      publicKey: '',
      osType: OsType.UBUNTU_24_04,
      core: 1,
      memory: 512,
      swap: 0,
      disk: 8,
    },
  });

  const onSubmit = useCallback(
    (values: CreateInstanceRequest) => {
      if (!project) return;

      startApi(
        async () => {
          const { instance } = await Api.Domain.Project.Instance.Index.createInstance(
            project.id,
            values,
          );
          router.push(`/project/instance/${instance.id}`);
        },
        {
          loading: '인스턴스를 생성하고 있습니다.',
          success: '인스턴스를 생성했습니다.',
        },
      );
    },
    [project],
  );

  if (!project) return <Loader />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-[600px]">
        <GeneralSetting form={form} />
        <ImageSetting form={form} />
        <PerformanceSetting form={form} />
        <SshKeySetting form={form} />
        <Button type="submit" disabled={isApi} size="lg">
          인스턴스 생성
        </Button>
      </form>
    </Form>
  );
}
