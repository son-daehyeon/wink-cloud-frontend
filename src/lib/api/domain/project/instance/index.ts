import Request from '@/lib/api/request';
import {
  CreateInstanceRequest,
  InstanceResponse,
  InstancesResponse,
  UpdateInstanceRequest,
} from '@/lib/api/type/domain/project/instance';

export default class Instance {
  constructor(private readonly request: Request) {}

  public async myInstances(projectId: string): Promise<InstancesResponse> {
    return this.request.get(`/project/${projectId}/instance`);
  }

  public async createInstance(
    projectId: string,
    data: CreateInstanceRequest,
  ): Promise<InstanceResponse> {
    return this.request.post(`/project/${projectId}/instance`, data);
  }

  public async updateInstance(
    projectId: string,
    instanceId: string,
    data: UpdateInstanceRequest,
  ): Promise<InstanceResponse> {
    return this.request.put(`/project/${projectId}/instance/${instanceId}`, data);
  }

  public async deleteInstance(projectId: string, instanceId: string): Promise<void> {
    return this.request.delete(`/project/${projectId}/instance/${instanceId}`);
  }
}
