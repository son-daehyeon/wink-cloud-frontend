import { z } from 'zod';

export const LoginRequestSchema = z.object({
  token: z.string().min(1, '토큰은 비어있을 수 없습니다.'),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

// ####################################################################################################

export interface LoginResponse {
  token: string;
}
