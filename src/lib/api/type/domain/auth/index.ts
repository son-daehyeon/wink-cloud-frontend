import { z } from 'zod';

export const LoginRequestSchema = z.object({
  token: z.string().min(1, '토큰은 비어있을 수 없습니다.'),
});

export const RefreshTokenRequestSchema = z.object({
  token: z.string().min(1, '토큰은 비어있을 수 없습니다.'),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

// ####################################################################################################

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
