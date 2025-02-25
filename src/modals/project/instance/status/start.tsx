import { useCallback } from 'react';

import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import Instance from '@/lib/api/type/schema/project/instance';
import { useModalStore } from '@/lib/store/modal';
import { useProjectStore } from '@/lib/store/project';

export interface InstanceStartProps {
  instance: Instance;
  callback: () => void;
}

export default function InstanceStartModal(props: InstanceStartProps) {
  const [isApi, startApi] = useApiWithToast();

  const { close } = useModalStore();
  const { project } = useProjectStore();

  const onStart = useCallback(({ instance, callback }: InstanceStartProps) => {
    startApi(
      async () => {
        await Api.Domain.Project.Instance.Status.start(project!.id, instance.id);
        callback();
      },
      {
        loading: '인스턴스를 시작하고 있습니다',
        success: '인스턴스를 시작했습니다.',
        finally: () => close(),
      },
    );
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>인스턴스 시작</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col space-y-4">
        <p>정말 인스턴스를 시작하시겠습니까?</p>
        <Button disabled={isApi} onClick={() => onStart(props)}>
          시작
        </Button>
      </div>
    </>
  );
}
