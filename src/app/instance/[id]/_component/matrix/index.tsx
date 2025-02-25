import { useEffect, useMemo, useState } from 'react';

import MatrixChart from '@/app/instance/[id]/_component/matrix/matrix-chart';
import { matrixInfos } from '@/app/instance/[id]/_constant/matrix-info';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useApi } from '@/hooks/use-api';

import Api from '@/lib/api';
import { InstanceMatrix, TimeUnit } from '@/lib/api/type/domain/project/instance/matrix';
import Instance from '@/lib/api/type/schema/project/instance';
import { useProjectStore } from '@/lib/store/project';

import { parseAsString, useQueryState } from 'nuqs';

interface MatrixProps {
  instance: Instance;
}

export default function Matrix({ instance }: MatrixProps) {
  const [, startApi] = useApi();

  const { project } = useProjectStore();

  const [timeUnit, setTimeUnit] = useQueryState('unit', parseAsString.withDefault(TimeUnit.HOUR));

  const [matrix, setMatrix] = useState<InstanceMatrix[]>([]);

  const unitName = useMemo(
    () => ({
      [TimeUnit.HOUR]: '시간 단위',
      [TimeUnit.DAY]: '일 단위',
      [TimeUnit.WEEK]: '주 단위',
      [TimeUnit.MONTH]: '월 단위',
      [TimeUnit.YEAR]: '년 단위',
    }),
    [],
  );

  useEffect(() => {
    if (!instance) return;

    const fetch = async () => {
      const { matrix } = await Api.Domain.Project.Instance.Matrix.getMatrix(
        project!.id,
        instance.id,
        timeUnit as TimeUnit,
      );
      setMatrix(matrix);
    };

    startApi(fetch);

    const timer = setInterval(() => startApi(fetch), 1000 * 60);

    return () => clearInterval(timer);
  }, [instance, timeUnit]);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-end p-1">
        <h2 className="text-xl md:text-2xl font-semibold">인스턴스 성능 지표</h2>
        <Select value={timeUnit} onValueChange={setTimeUnit}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="주기" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(TimeUnit).map((unit) => (
              <SelectItem key={unit} value={unit}>
                {unitName[unit as TimeUnit]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        {matrixInfos.map((matrixInfo) => (
          <MatrixChart key={matrixInfo.name} matrix={matrix} matrixInfo={matrixInfo} />
        ))}
      </div>
    </section>
  );
}
