import BaseSchema from '@/lib/api/type/schema/common/base-schema';

export default interface User extends BaseSchema {
  email: string;
  name: string;
  avatar: string;
  fee: boolean;
}
