import Request from '@/lib/api/request';
import {
  CreateProjectRequest,
  InviteProjectRequest,
  ProjectResponse,
  ProjectsResponse,
} from '@/lib/api/type/domain/project';

export default class Project {
  constructor(private readonly request: Request) {}

  public async myProjects(): Promise<ProjectsResponse> {
    return this.request.get('/project');
  }

  public async invitedProjects(): Promise<ProjectsResponse> {
    return this.request.get('/project/invited');
  }

  public async createProject(data: CreateProjectRequest): Promise<ProjectResponse> {
    return this.request.post('/project', data);
  }

  public async inviteProject(
    projectId: string,
    data: InviteProjectRequest,
  ): Promise<ProjectResponse> {
    return this.request.post(`/project/${projectId}/invite`, data);
  }

  public async acceptInvite(projectId: string): Promise<ProjectResponse> {
    return this.request.post(`/project/${projectId}/invite/accept`);
  }

  public async declineInvite(projectId: string): Promise<ProjectResponse> {
    return this.request.post(`/project/${projectId}/invite/decline`);
  }

  public async deleteInvite(projectId: string, userId: string): Promise<ProjectResponse> {
    return this.request.delete(`/project/${projectId}/invite/${userId}`);
  }

  public async updateProject(
    projectId: string,
    data: CreateProjectRequest,
  ): Promise<ProjectResponse> {
    return this.request.put(`/project/${projectId}`, data);
  }

  public async deleteProject(projectId: string): Promise<void> {
    return this.request.delete(`/project/${projectId}`);
  }

  public async deleteMember(projectId: string, userId: string): Promise<ProjectResponse> {
    return this.request.delete(`/project/${projectId}/member/${userId}`);
  }
}
