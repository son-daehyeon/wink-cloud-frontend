import Request from '@/lib/api/request';
import { UsersResponse } from '@/lib/api/type/domain/user';

export default class User {
  constructor(private readonly request: Request) {}

  public async all(): Promise<UsersResponse> {
    return this.request.get('/user');
  }
}
