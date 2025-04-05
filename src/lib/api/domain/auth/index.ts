import Request from '@/lib/api/request';
import { LoginRequest, LoginResponse } from '@/lib/api/type/domain/auth';
import { UserResponse } from '@/lib/api/type/domain/user';

export default class Auth {
  constructor(private readonly request: Request) {}

  public async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request.post('/auth/login', data);
  }

  public async me(): Promise<UserResponse> {
    return this.request.get('/auth/me');
  }
}
