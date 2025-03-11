import { useMemo } from 'react';

import { MatrixInfo } from '@/app/project/instance/[id]/_constant/matrix-info';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

import { InstanceMatrix } from '@/lib/api/type/domain/project/instance/matrix';

import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

interface MatrixChartProps {
  matrix: InstanceMatrix[];
  matrixInfo: MatrixInfo;
}

export default function MatrixChart({ matrix, matrixInfo }: MatrixChartProps) {
  const ChartBox = useMemo(
    () => (matrixInfo.type === 'area' ? AreaChart : LineChart),
    [matrixInfo.type],
  );

  const ChartElement = useMemo(() => (matrixInfo.type === 'area' ? Area : Line), [matrixInfo.type]);

  return (
    <Card key={matrixInfo.name} className="w-full">
      <CardHeader>
        <CardTitle>{matrixInfo.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="w-full max-h-96 aspect-ratio-2/1"
          config={{
            [matrixInfo.value1]: {
              label: matrixInfo.label1,
              color: 'var(--chart-1)',
            },
            [matrixInfo.value2]: {
              label: matrixInfo.label2,
              color: 'var(--chart-2)',
            },
          }}
        >
          <ChartBox data={matrix}>
            <CartesianGrid />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(time) =>
                formatDistanceToNow(new Date(time), {
                  locale: ko,
                  addSuffix: true,
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `${value}${matrixInfo.unit}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(date) => {
                    try {
                      return format(new Date(date), 'yyyy년 MM월 dd일 HH시 mm분');
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (_) {
                      return date;
                    }
                  }}
                />
              }
            />
            <ChartElement
              dataKey={matrixInfo.value1}
              fill="var(--color-chart-1)"
              stroke="var(--color-chart-1)"
              fillOpacity={0.15}
              dot={false}
            />
            <ChartElement
              dataKey={matrixInfo.value2}
              fill="var(--color-chart-2)"
              stroke="var(--color-chart-2)"
              fillOpacity={0.5}
              dot={false}
            />
          </ChartBox>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
