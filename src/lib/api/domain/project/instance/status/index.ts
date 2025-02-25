import Request from '@/lib/api/request';
import { InstanceStatusResponse } from '@/lib/api/type/domain/project/instance/status';

export default class InstanceStatus {
  constructor(private readonly request: Request) {}

  public async currentStatus(
    projectId: string,
    instanceId: string,
  ): Promise<InstanceStatusResponse> {
    return this.request.get(`/project/${projectId}/instance/${instanceId}/status`);
  }

  public async start(projectId: string, instanceId: string): Promise<void> {
    return this.request.post(`/project/${projectId}/instance/${instanceId}/status/start`);
  }

  public async shutdown(projectId: string, instanceId: string): Promise<void> {
    return this.request.post(`/project/${projectId}/instance/${instanceId}/status/shutdown`);
  }

  public async stop(projectId: string, instanceId: string): Promise<void> {
    return this.request.post(`/project/${projectId}/instance/${instanceId}/status/stop`);
  }
}
