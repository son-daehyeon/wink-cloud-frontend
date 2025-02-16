import User from '@/lib/api/type/schema/user';

export interface UserResponse {
  user: User;
}

export interface UsersResponse {
  users: User[];
}
