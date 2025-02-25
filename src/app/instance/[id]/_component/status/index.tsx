import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { useApi } from '@/hooks/use-api';

import Api from '@/lib/api';
import { InstanceMatrix } from '@/lib/api/type/domain/project/instance/matrix';
import Instance from '@/lib/api/type/schema/project/instance';
import { useModalStore } from '@/lib/store/modal';
import { useProjectStore } from '@/lib/store/project';

import { InstanceStartProps } from '@/modals/project/instance/status/start';
import { InstanceStopProps } from '@/modals/project/instance/status/stop';
import { formatDuration, intervalToDuration } from 'date-fns';

interface StatusProps {
  instance: Instance;
}

export default function Status({ instance }: StatusProps) {
  const [, startApi] = useApi();

  const { project } = useProjectStore();
  const { open } = useModalStore();

  const [running, setRunnig] = useState<boolean>();
  const [uptime, setUptime] = useState<number>();
  const [matrix, setMatrix] = useState<InstanceMatrix>();

  const formatUptime = (seconds: number) => {
    const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
    return formatDuration(duration, {
      format: ['days', 'hours', 'minutes', 'seconds'],
      locale: {
        formatDistance: (token, count) => {
          const units: Record<string, string> = {
            xDays: `${count}일`,
            xHours: `${count}시간`,
            xMinutes: `${count}분`,
            xSeconds: `${count}초`,
          };
          return units[token] || '';
        },
      },
    });
  };

  useEffect(() => {
    if (!instance) return;

    startApi(async () => {
      const { running, uptime } = await Api.Domain.Project.Instance.Status.currentStatus(
        project!.id,
        instance.id,
      );

      setRunnig(running);
      setUptime(uptime);
    });
  }, [instance]);

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => setUptime((prev) => prev! + 1), 1000);

    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (!instance || !running) return;

    const fetch = async () => {
      const { matrix } = await Api.Domain.Project.Instance.Matrix.getCurrentMatrix(
        project!.id,
        instance.id,
      );
      setMatrix(matrix);
    };

    startApi(fetch);

    const timer = setInterval(() => startApi(fetch), 1000);

    return () => clearInterval(timer);
  }, [instance, running]);

  return (
    <section className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>인스턴스 상태</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {running !== undefined && (
            <div>
              <div className="flex justify-between mb-2">
                <span>상태</span>
                <Badge
                  variant={running ? 'default' : 'destructive'}
                  className="cursor-pointer"
                  onClick={() =>
                    running
                      ? open<InstanceStopProps>('project:instance:status:stop', {
                          instance,
                          callback: () => {
                            setRunnig(false);
                            setUptime(undefined);
                          },
                        })
                      : open<InstanceStartProps>('project:instance:status:start', {
                          instance,
                          callback: () => {
                            setRunnig(true);
                            setUptime(0);
                          },
                        })
                  }
                >
                  {running ? '실행 중' : '중지됨'}
                </Badge>
              </div>
            </div>
          )}
          {running && uptime !== undefined && (
            <div>
              <div className="flex justify-between mb-2">
                <span>업타임</span>
                <span>{formatUptime(uptime)}</span>
              </div>
            </div>
          )}
          {running && matrix && (
            <>
              <div>
                <div className="flex justify-between mb-2">
                  <span>CPU</span>
                  <span>{matrix.currentCpu}%</span>
                </div>
                <Progress value={matrix.currentCpu} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>메모리</span>
                  <span>
                    {matrix.currentMemory} MB / {matrix.maxMemory} MB
                  </span>
                </div>
                <Progress value={(matrix.currentMemory / matrix.maxMemory) * 100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>디스크</span>
                  <span>
                    {matrix.currentDisk} GiB / {matrix.maxDisk} GiB
                  </span>
                </div>
                <Progress value={(matrix.currentDisk / matrix.maxDisk) * 100} className="h-2" />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
