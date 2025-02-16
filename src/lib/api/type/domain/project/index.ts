import Project from '@/lib/api/schema/project';

import { z } from 'zod';

export const CreateProjectRequestSchema = z.object({
  name: z.string().min(1, '이름은 비어있을 수 없습니다.'),
});

export type CreateProjectRequest = z.infer<typeof CreateProjectRequestSchema>;

// ####################################################################################################

export interface ProjectResponse {
  project: Project;
}

export interface ProjectsResponse {
  projects: Project[];
}
