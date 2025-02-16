import BaseSchema from '@/lib/api/type/schema/common/base-schema';
import Project from '@/lib/api/type/schema/project';

export default interface Instance extends BaseSchema {
  name: string;
  vmid: number;
  project: Project;
  core: number;
  memory: number;
  swap: number;
  disk: number;
  ip: string;
}
