import Record, { RRType, getRegex } from '@/lib/api/type/schema/record';

import { z } from 'zod';

export const CreateRecordRequestSchema = z
  .object({
    name: z.string().min(1, '레코드 이름은 비어있을 수 없습니다.'),
    type: z.nativeEnum(RRType),
    ttl: z.number().min(60).max(172800),
    records: z.array(z.string()).min(1, '레코드는 비어있을 수 없습니다.').max(100),
  })
  .refine((data) => data.records.every((record) => getRegex(data.type).test(record)), {
    message: '잘못된 레코드 형식입니다.',
    path: ['records'],
  });

export const UpdateRecordRequestSchema = z
  .object({
    type: z.nativeEnum(RRType),
    ttl: z.number().min(60).max(172800),
    records: z.array(z.string()).min(1, '레코드는 비어있을 수 없습니다.').max(100),
  })
  .refine((data) => data.records.every((record) => getRegex(data.type).test(record)), {
    message: '잘못된 레코드 형식입니다.',
    path: ['records'],
  });

export type CreateRecordRequest = z.infer<typeof CreateRecordRequestSchema>;
export type UpdateRecordRequest = z.infer<typeof UpdateRecordRequestSchema>;

// ####################################################################################################

export interface GetRecordResponse {
  record: Record;
}

export interface GetRecordsResponse {
  records: Record[];
}
