import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { useApiWithToast } from '@/hooks/use-api';

import Api from '@/lib/api';
import Instance from '@/lib/api/type/schema/project/instance';
import { useModalStore } from '@/lib/store/modal';
import { useProjectStore } from '@/lib/store/project';

import { InstanceStartProps } from '@/modals/project/instance/status/start';
import { CheckedState } from '@radix-ui/react-checkbox';

export interface InstanceStopProps {
  instance: Instance;
  callback: () => void;
}

export default function InstanceStopModal(props: InstanceStopProps) {
  const [isApi, startApi] = useApiWithToast();

  const { close } = useModalStore();
  const { project } = useProjectStore();

  const [force, setForce] = useState<CheckedState>(false);

  const onShutdown = useCallback(({ instance, callback }: InstanceStartProps) => {
    startApi(
      async () => {
        await Api.Domain.Project.Instance.Status.shutdown(project!.id, instance.id);
        callback();
      },
      {
        loading: '인스턴스를 종료하고 있습니다',
        success: '인스턴스를 종료했습니다.',
        finally: () => close(),
      },
    );
  }, []);

  const onStop = useCallback(({ instance, callback }: InstanceStartProps) => {
    startApi(
      async () => {
        await Api.Domain.Project.Instance.Status.stop(project!.id, instance.id);
        callback();
      },
      {
        loading: '인스턴스를 강제 종료하고 있습니다',
        success: '인스턴스를 강제 종료했습니다.',
        finally: () => close(),
      },
    );
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>인스턴스 종료</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col space-y-4">
        <p>정말 인스턴스를 종료하시겠습니까?</p>

        <div className="items-top flex space-x-2">
          <Checkbox id="force" checked={force} onCheckedChange={setForce} />
          <Label htmlFor="force">강제 종료</Label>
        </div>

        <Button disabled={isApi} onClick={() => (force ? onStop(props) : onShutdown(props))}>
          {force ? '강제 종료' : '종료'}
        </Button>
      </div>
    </>
  );
}
