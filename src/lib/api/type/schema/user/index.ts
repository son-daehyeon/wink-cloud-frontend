import BaseSchema from '@/lib/api/type/schema/common/base-schema';

export default interface User extends BaseSchema {
  name: string;
  avatar: string;
  fee: boolean;
}
