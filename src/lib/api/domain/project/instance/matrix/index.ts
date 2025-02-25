import Request from '@/lib/api/request';
import {
  InstanceCurrentMatrixResponse,
  InstanceMatrixResponse,
  TimeUnit,
} from '@/lib/api/type/domain/project/instance/matrix';

export default class InstanceMatrix {
  constructor(private readonly request: Request) {}

  public async getCurrentMatrix(
    projectId: string,
    instanceId: string,
  ): Promise<InstanceCurrentMatrixResponse> {
    return this.request.get(`/project/${projectId}/instance/${instanceId}/matrix/current`);
  }

  public async getMatrix(
    projectId: string,
    instanceId: string,
    timeUnit: TimeUnit = TimeUnit.HOUR,
  ): Promise<InstanceMatrixResponse> {
    return this.request.get(
      `/project/${projectId}/instance/${instanceId}/matrix?timeUnit=${timeUnit}`,
    );
  }
}
