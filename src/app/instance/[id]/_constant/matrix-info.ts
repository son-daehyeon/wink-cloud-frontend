import { InstanceMatrix } from '@/lib/api/type/domain/project/instance/matrix';

export interface MatrixInfo {
  name: string;
  type: 'area' | 'line';
  unit: '%' | 'MB' | 'GB';
  value1: keyof Omit<InstanceMatrix, 'time'>;
  label1: string;
  value2: keyof Omit<InstanceMatrix, 'time'>;
  label2: string;
}

export const matrixInfos: MatrixInfo[] = [
  {
    name: 'CPU',
    type: 'area',
    unit: '%',
    value1: 'maxCpu',
    label1: '최대 CPU 사용량',
    value2: 'currentCpu',
    label2: 'CPU 사용량',
  },
  {
    name: '메모리',
    type: 'area',
    unit: 'MB',
    value1: 'maxMemory',
    label1: '최대 메모리 사용량',
    value2: 'currentMemory',
    label2: '메모리 사용량',
  },
  {
    name: '디스크 용량',
    type: 'area',
    unit: 'GB',
    value1: 'maxDisk',
    label1: '최대 디스크 용량',
    value2: 'currentDisk',
    label2: '디스크 용량',
  },
  {
    name: '디스크 읽기/쓰기',
    type: 'line',
    unit: 'MB',
    value1: 'diskInput',
    label1: '디스크 읽기',
    value2: 'diskOutput',
    label2: '디스크 쓰기',
  },
  {
    name: '네트워크 읽기/쓰기',
    type: 'line',
    unit: 'MB',
    value1: 'networkInput',
    label1: '네트워크 읽기',
    value2: 'networkOutput',
    label2: '네트워크 쓰기',
  },
];
