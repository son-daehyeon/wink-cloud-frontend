import Request from '@/lib/api/request';
import { InstanceMatrixResponse } from '@/lib/api/type/domain/project/instance/matrix';

export default class InstanceMatrix {
  constructor(private readonly request: Request) {}

  public async getMatrix(projectId: string, instanceId: string): Promise<InstanceMatrixResponse> {
    return this.request.get(`/project/${projectId}/instance/${instanceId}/matrix`);
  }
}
