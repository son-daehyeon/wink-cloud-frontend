import BaseSchema from '@/lib/api/type/schema/common/base-schema';
import User from '@/lib/api/type/schema/user';

export default interface Project extends BaseSchema {
  icon: string;
  name: string;
  participants: User[];
  pending: User[];
}
