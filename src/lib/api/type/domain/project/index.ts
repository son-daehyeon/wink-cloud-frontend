import Project from '@/lib/api/type/schema/project';

import { z } from 'zod';

export const CreateProjectRequestSchema = z.object({
  icon: z.string().min(1, '아이콘은 비어있을 수 없습니다.'),
  name: z.string().min(1, '이름은 비어있을 수 없습니다.'),
});

export const InviteProjectRequestSchema = z.object({
  users: z.array(z.string()),
});

export type CreateProjectRequest = z.infer<typeof CreateProjectRequestSchema>;
export type InviteProjectRequest = z.infer<typeof InviteProjectRequestSchema>;

// ####################################################################################################

export interface ProjectResponse {
  project: Project;
}

export interface ProjectsResponse {
  projects: Project[];
}
