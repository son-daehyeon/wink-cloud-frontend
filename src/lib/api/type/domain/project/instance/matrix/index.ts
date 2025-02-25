export enum TimeUnit {
  HOUR = 'HOUR',
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

// ####################################################################################################

export interface InstanceMatrix {
  time: string;
  maxCpu: number;
  currentCpu: number;
  maxMemory: number;
  currentMemory: number;
  maxDisk: number;
  currentDisk: number;
  diskInput: number;
  diskOutput: number;
  networkInput: number;
  networkOutput: number;
}

// ####################################################################################################

export interface InstanceCurrentMatrixResponse {
  matrix: InstanceMatrix;
}

export interface InstanceMatrixResponse {
  matrix: InstanceMatrix[];
}
