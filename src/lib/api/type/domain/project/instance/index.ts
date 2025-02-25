import Instance from '@/lib/api/type/schema/project/instance';

import { z } from 'zod';

export enum OsType {
  UBUNTU_24_10 = 'UBUNTU_24_10',
  UBUNTU_24_04 = 'UBUNTU_24_04',
  UBUNTU_22_04 = 'UBUNTU_22_04',
  UBUNTU_20_04 = 'UBUNTU_20_04',
  DEBIAN_12 = 'DEBIAN_12',
  DEBIAN_11 = 'DEBIAN_11',
  CENTOS_9 = 'CENTOS_9',
  ROCKY_LINUX_9 = 'ROCKY_LINUX_9',
  ALMA_LINUX_9 = 'ALMA_LINUX_9',
}

// ####################################################################################################

export const CreateInstanceRequestSchema = z.object({
  name: z.string().min(1, '이름은 비어있을 수 없습니다.'),
  publicKey: z.string().min(1, '공개 키는 비어있을 수 없습니다.'),
  osType: z.nativeEnum(OsType),
  core: z.number().int().min(1, '코어는 1 이상이어야 합니다.').max(4, '코어는 4 이하여야 합니다.'),
  memory: z
    .number()
    .int()
    .min(512, '메모리는 512MB 이상이어야 합니다.')
    .max(4096, '메모리는 4096MB 이하여야 합니다.'),
  swap: z
    .number()
    .int()
    .min(0, '스왑 메모리는 0 이상이어야 합니다.')
    .max(4096, '스왑 메모리는 4096MB 이하여야 합니다.'),
  disk: z
    .number()
    .int()
    .min(8, '디스크는 8GB 이상이어야 합니다.')
    .max(128, '디스크는 128GB 이하여야 합니다.'),
});

export const UpdateInstanceRequestSchema = z.object({
  name: z.string().min(1, '이름은 비어있을 수 없습니다.'),
  core: z
    .number()
    .int()
    .positive()
    .min(1, '코어는 1 이상이어야 합니다.')
    .max(4, '코어는 4 이하여야 합니다.'),
  memory: z
    .number()
    .int()
    .positive()
    .min(512, '메모리는 512MB 이상이어야 합니다.')
    .max(4096, '메모리는 4096MB 이하여야 합니다.'),
  swap: z
    .number()
    .int()
    .min(0, '스왑 메모리는 0 이상이어야 합니다.')
    .max(4096, '스왑 메모리는 4096MB 이하여야 합니다.'),
  disk: z
    .number()
    .int()
    .positive()
    .min(8, '디스크는 8GB 이상이어야 합니다.')
    .max(128, '디스크는 128GB 이하여야 합니다.'),
});

export type CreateInstanceRequest = z.infer<typeof CreateInstanceRequestSchema>;
export type UpdateInstanceRequest = z.infer<typeof UpdateInstanceRequestSchema>;

// ####################################################################################################

export interface InstanceResponse {
  instance: Instance;
}

export interface InstancesResponse {
  instances: Instance[];
}
