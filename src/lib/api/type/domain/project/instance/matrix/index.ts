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
  maxcpu: number;
  cpu: number;
  maxmem: number;
  mem: number;
  maxdisk: number;
  disk: number;
  diskread: number;
  diskwrite: number;
  netin: number;
  netout: number;
}

// ####################################################################################################

export interface InstanceMatrixResponse {
  matrix: InstanceMatrix[];
}
