import { useCallback } from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import Instance from '@/lib/api/type/schema/project/instance';
import { useModalStore } from '@/lib/store/modal';
import { useProjectStore } from '@/lib/store/project';

export interface InstanceDeleteProps {
  instance: Instance;
}

export default function InstanceDeleteModal(props: InstanceDeleteProps) {
  const router = useRouter();

  const [isApi, startApi] = useApiWithToast();

  const { close } = useModalStore();
  const { project } = useProjectStore();

  const onDelete = useCallback(({ instance }: InstanceDeleteProps) => {
    startApi(
      async () => {
        await Api.Domain.Project.Instance.Index.deleteInstance(project!.id, instance.id);
        router.replace('/project/instance');
      },
      {
        loading: '인스턴스를 삭제하고 있습니다',
        success: '인스턴스를 삭제했습니다.',
        finally: () => close(),
      },
    );
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>인스턴스 삭제</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col space-y-4">
        <p>정말 인스턴스를 삭제하시겠습니까?</p>
        <Button variant="destructive" disabled={isApi} onClick={() => onDelete(props)}>
          삭제
        </Button>
      </div>
    </>
  );
}
